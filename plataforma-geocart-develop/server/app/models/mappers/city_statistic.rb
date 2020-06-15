class Mappers::CityStatistic < Mappers::Interface
  def create_from_rows!
    load_data

    @city_statistics ||= @spreadsheet
      .sheet(SHEETS[:city_statistics])
      .drop(HEADER)
      .map { |row| map_columns(row) }
      .compact

    ::CityStatistic.import! @city_statistics
  end

  private

  def load_data
    @cached_cities ||= Hash[City.pluck(:code, :id)].freeze
  end

  def map_columns(row)
    city_id = @cached_cities[row[0].to_s]
    return if city_id.blank?

    {
      city_id: city_id,
      tax_area: row[1].to_f,
      bare_land_value: row[2].to_f,
      rural_land_property_tax: row[3].to_f,
      paying_real_estates: row[4].to_i,
      exempts_or_immunes: row[5].to_i,
      small_private_real_estates: row[6].to_i,
      medium_private_real_estates: row[7].to_i,
      large_private_real_estates: row[8].to_i,
      tax_collected: row[9].to_f,
      expected_per_collected_tax_ratio: row[10].to_f,
      current_stocking: row[11].to_f,
      # I've created this year column just if the customer asks for any time-related features in the near future.
      # But for now, it is not being used.
      year: 2018
    }
  end
end
