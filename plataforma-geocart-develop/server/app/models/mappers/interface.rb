class Mappers::Interface
  HEADER = 1
  SHEETS = {
    region_statistics: 0, # Not used yet
    city_statistics: 1,
    regions: 2,
    cities: 3,
    # Not persisted, used to aggregate cities informations, could also reside in the cities sheet,
    # but it is easier to the user to have this as a separated sheet.
    cities_per_region_code: 4,
    tax_collected: 5 # Not used yet
  }.freeze

  def initialize(spreadsheet)
    @spreadsheet = spreadsheet
  end

  def create_rows!
    raise 'Não implementado!'
  end
end
