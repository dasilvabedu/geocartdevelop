class Types::JwtType < Types::BaseObject
  field :sub, Integer, null: false
  field :exp, Integer, null: false
  field :profile, String, null: false
end
