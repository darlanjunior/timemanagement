class UsersController < ApplicationController
  before_action :authenticate_user!
  def index
    result = User::List.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result["result.policy.default"].success? ? :ok : :unauthorized
    )
  end

  def create
    result = User::Create.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def update
    result = User::Update.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def destroy
    result = User::Destroy.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def reset_password
    user = User.find_by(id: params[:user_id])
    if !user
      render(
        json: {errors: ['Invalid user_id']},
        status: 422
      )
      return
    end

    hierarchies = hierarchy(current_user.role)

    if !hierarchies.include? user.role
      render(
        json: {errors: ['Not authorized to reset password']},
        status: :unauthorized
      )
    end

    if user.send_reset_password_instructions
      render json: {status: 'success'}
    end
  end

  private
  def hierarchy role
    roles = ['Admin', 'Manager', 'EndUser']

    roles.slice((roles.index(role)+1)..-1)
  end
end
