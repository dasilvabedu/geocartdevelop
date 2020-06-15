class Mutations::CreateToken < Mutations::BaseMutation
  type ::Types::LoginType

  argument :phone, String, required: true
  argument :password, String, required: true

  def ready?(*args)
    true
  end

  def resolve(phone:, password:)
    current_user = User.find_by_phone(phone)

    if !current_user || !current_user.authenticate(password)
      raise GraphQL::ExecutionError, 'Usuário ou senha incorretos'
    end

    {
      token: current_user.jwt,
      user: current_user
    }
  end
end
