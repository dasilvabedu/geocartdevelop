class Mappers::City < Mappers::Interface
  def create_from_rows!
    load_data

    @cities ||= @spreadsheet
      .sheet(SHEETS[:cities])
      .drop(HEADER)
      .map { |row| map_columns(row) }

    ::City.import! @cities
  end

  private

  def load_data
    @cached_states   ||= Hash[State.pluck(:code, :id)].freeze
    @cached_regions  ||= Hash[Region.pluck(:code, :id)].freeze

    load_cities_per_regions
  end

  def load_cities_per_regions
    @regions_codes = {}

    @spreadsheet
      .sheet(SHEETS[:cities_per_region_code])
      .drop(HEADER)
      .map { |row| @regions_codes[row[0].to_i] = row[1].to_i }
  end

  def map_columns(row)
    return if row[0].blank?

    city_code = row[1].to_i
    state_code = row[0].to_i
    region_code = @regions_codes[city_code]

    {
      name: row[3],
      code: city_code,
      state_id: @cached_states[state_code],
      region_id: @cached_regions[region_code]
    }
  end
end
