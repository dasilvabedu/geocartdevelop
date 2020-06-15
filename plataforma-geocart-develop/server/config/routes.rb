Rails.application.routes.draw do
  scope '/api' do
    post '/graphql', to: 'graphql#execute'
  end

  get '*path', to: 'static#index'
end
