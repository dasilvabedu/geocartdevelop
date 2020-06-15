class Mappers::Region < Mappers::Interface
  def create_from_rows!
    @regions ||= @spreadsheet
      .sheet(SHEETS[:regions])
      .drop(HEADER)
      .map { |row| map_columns(row) }

    ::Region.import! @regions
  end

  private

  def map_columns(row)
    return if row[0].blank?

    {
      code: row[0].to_i
    }
  end
end
