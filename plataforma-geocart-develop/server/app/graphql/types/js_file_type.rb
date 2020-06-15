module Types
  class JSFileType < Types::BaseObject
    extend ::Modules::Graphql::ActiveRecordFieldGenerators

    fields_from_columns_of ActiveStorage::Blob
  end
end
