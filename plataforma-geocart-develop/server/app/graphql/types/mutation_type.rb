class Types::MutationType < Types::BaseObject
  field :upload_file,
    mutation: Mutations::UploadFile

  field :create_token,
    mutation: Mutations::CreateToken
end
