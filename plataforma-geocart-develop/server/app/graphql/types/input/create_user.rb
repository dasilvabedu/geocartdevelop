class Types::Input::CreateUser < Types::BaseInputObject
  argument :name, String, required: true
  argument :phone, String, required: true
  argument :password, String, required: true
end
