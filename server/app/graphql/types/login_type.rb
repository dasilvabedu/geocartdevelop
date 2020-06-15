module Types
  class UserLoginType < Types::BaseObject
    extend ::Modules::Graphql::ActiveRecordFieldGenerators

    fields_from_columns_of User
  end

  class LoginType < Types::BaseObject
    field :token, String, null: false
    field :user, UserLoginType, null: false
  end
end
