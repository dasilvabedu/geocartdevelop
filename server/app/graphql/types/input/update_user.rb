class Types::Input::UpdateUser < Types::BaseInputObject
  argument :name, String, required: false
  argument :phone, String, required: false
  argument :password, String, required: false
end
