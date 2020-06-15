class Types::BaseInputObject < GraphQL::Schema::InputObject
  argument_class ::Types::BaseArgument

  def self.default_graphql_name
    "#{super}Input"
  end
end
