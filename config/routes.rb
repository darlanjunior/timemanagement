Rails.application.routes.draw do
  mount_devise_token_auth_for 'User',
    at: 'users',
    skip: [:confirmations, :registrations],
    controllers: {passwords: 'passwords'}

  mount_devise_token_auth_for 'EndUser', at: 'users', skip: [:sessions, :passwords]

  resources :users
  resources :time_entries
end
