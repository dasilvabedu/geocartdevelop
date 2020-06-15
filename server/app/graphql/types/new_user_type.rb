class Types::NewUserType < Types::UserType
  def self.authorized?(user, context)
    true
  end

  def self.scope_items(items, ctx)
    []
  end
end
