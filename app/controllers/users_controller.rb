class UsersController < ApplicationController
  def index
    result = User::List.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result["result.policy.default"].success? ? :ok : :unauthorized
    )
  end

  def create
    result = User::Create.(params, 'current_user' => current_user)
    status = result.success? ? :ok : :unprocessable_entity

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def update
    result = User::Update.(params, 'current_user' => current_user)
    status = result.success? ? :ok : :unprocessable_entity

    render(
      json: result[:'result.json'],
      status: status
    )
  end

  def destroy
    result = User::Destroy.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end
end
