Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'users', controllers: {passwords: 'passwords'}
  resources :users, constraints: RoleRouteConstraint.new { |user| user } do
    resources :time_entries
  end

  resources :time_entries
end
