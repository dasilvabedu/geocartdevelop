class Mappers::RegionStatistic < Mappers::Interface
  def create_from_rows!
    load_data

    @region_statistics ||= @spreadsheet
      .sheet(SHEETS[:region_statistics])
      .drop(HEADER)
      .map { |row| map_columns(row) }
      .compact

    ::RegionStatistic.import! @region_statistics
  end

  private

  def load_data
    @cached_regions     ||= Hash[Region.pluck(:code, :id)].freeze
    @cached_categories  ||= Hash[Category.pluck(:name, :id)].freeze
    @cached_levels      ||= Hash[Level.pluck(:name, :id)].freeze
  end

  def map_columns(row)
    region_id = @cached_regions[row[0]]
    category_id = @cached_categories[row[1]]
    level_id = @cached_levels[row[2]]

    return if [region_id, category_id, level_id].any?(&:blank?)

    {
      region_id: region_id,
      category_id: category_id,
      level_id: level_id,
      bare_land_value: row[3].to_f,
      proposed_stocking: row[4].to_f,
      # I've created this year column just if the customer asks for any time-related features in the near future.
      # But for now, it is not being used.
      year: 2018
    }
  end
end
