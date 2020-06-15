class Types::ValidationType < Types::BaseObject
  field :success, Boolean, null: false
  field :messages, [String], null: true
end
