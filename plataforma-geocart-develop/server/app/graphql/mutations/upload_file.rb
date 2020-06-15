module Mutations
  class UploadFile < BaseMutation
    include Spreadsheet

    type Types::ValidationType

    argument :file, ApolloUploadServer::Upload, required: true
    argument :ignore_validation, Boolean, required: true

    def resolve(file:, ignore_validation:)
      user = context[:current_user]

      user.spreadsheet.attach(
        io: File.open(file.tempfile),
        filename: file.original_filename
      )

      raise GraphQL::ExecutionError.new 'Não foi possível carregar o arquivo' if user.spreadsheet.blank?

      import(persisted_file: user.spreadsheet, ignore_validation: ignore_validation)

      {
        success: true,
        messages: [
          "#{user.spreadsheet.id}º planilha importada",
          "Total de Regiões: #{Region.count}",
          "Total de Municípios: #{City.count}",
          "Total de Estatísticas de Regiões: #{RegionStatistic.count}",
          "Total de Estatísticas de Municípios: #{CityStatistic.count}"
        ]
      }
    end
  end
end