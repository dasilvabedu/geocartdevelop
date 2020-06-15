class Types::QueryType < Types::BaseObject
  extend ::Modules::Graphql::ActiveRecordFieldGenerators

  default_finders_for User, ::Types::UserType,
    restrict: false, scope: true

  field :charts, ::Types::JSON, null: true do
    argument :input, ::Types::JSON, required: false
  end
  def charts(input:)
    @city_statistics = city_statistics(code: input[:city_ibge_code])
    @region_statistics = region_statistics(code: input[:city_ibge_code])

    {
      statistics: statistics(@city_statistics),
      payersAndExempts: payers_and_exempts(@city_statistics),
      expectedPerCollected: expected_per_collected(@city_statistics),
      privateRealEstatePerSizes: private_real_estate_per_sizes(@city_statistics),
      bareLandValuePerLevel: bare_land_value_per_level(@region_statistics),
      proposedStockingPerLevel: proposed_stocking_per_level(@region_statistics)
    }
  end

  private

  def private_real_estate_per_sizes(data)
    [{
      name: 'Imóveis',
      colorByPoint: true,
      data: [{
        name: 'Pequenos',
        y: data.sum(:small_private_real_estates),
      }, {
        name: 'Médios',
        y: data.sum(:medium_private_real_estates)
      }, {
        name: 'Grandes',
        y: data.sum(:large_private_real_estates)
      }]
    }]
  end

  def payers_and_exempts(data)
    [{
      name: 'Imóveis',
      colorByPoint: true,
      data: [{
        name: 'Pagantes',
        y: data.sum(:paying_real_estates),
      }, {
        name: 'Imunes ou Isentos',
        y: data.sum(:exempts_or_immunes)
      }]
    }]
  end

  def expected_per_collected(data)
    [{
      data: [
        ['Projetado', data.sum(:rural_land_property_tax)&.to_f],
        ['Real', data.sum(:tax_collected)&.to_f]
      ]
    }]
  end

  def statistics(data)
    {
      expectedPerCollectedTaxRatio:
        data.expected_per_collected,
      currentStocking:
        data.sum(:current_stocking)&.to_f,
      taxArea:
        data.sum(:tax_area)&.to_f,
      bareLandValue:
        data.sum(:bare_land_value)&.to_f
    }
  end

  def bare_land_value_per_level(data)
    [{
      data: [
        ['Baixa', data.where({ levels: { name: 'Baixa' }}).sum(:bare_land_value)&.to_f],
        ['Média', data.where({ levels: { name: 'Média' }}).sum(:bare_land_value)&.to_f],
        ['Alta', data.where({ levels: { name: 'Alta' }}).sum(:bare_land_value)&.to_f]
      ]
    }]
  end

  def proposed_stocking_per_level(data)
    [{
      data: [
        ['Baixa', data.where({ levels: { name: 'Baixa' }}).sum(:proposed_stocking)&.to_f],
        ['Média', data.where({ levels: { name: 'Média' }}).sum(:proposed_stocking)&.to_f],
        ['Alta', data.where({ levels: { name: 'Alta' }}).sum(:proposed_stocking)&.to_f]
      ]
    }]
  end

  def city_statistics(params={})
    if params[:code].present? && params[:code] != 'undefined'
      CityStatistic.joins(:city).where({ cities: params })
    else
      CityStatistic.all
    end
  end

  def region_statistics(params={})
    if params[:code].present? && params[:code] != 'undefined'
      city_region_id = City.find_by_code(params[:code]).region.id
      RegionStatistic.joins(:level).where(region_id: city_region_id)
    else
      RegionStatistic.joins(:level)
    end
  end
end
