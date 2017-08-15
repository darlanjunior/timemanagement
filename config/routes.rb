Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'users', controllers: {passwords: 'passwords'}
  resources :time_entries
end
