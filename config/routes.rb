Rails.application.routes.draw do
  resources :users, constraints: RoleRouteConstraint.new { |user| user }, except: [:show]
  mount_devise_token_auth_for 'User', at: 'users', controllers: {passwords: 'passwords'}

  resources :time_entries do
    resources :notes, only: [:create, :destroy]
  end

  resources :live_tasks
end
