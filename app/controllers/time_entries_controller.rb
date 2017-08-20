class TimeEntriesController < ApplicationController
  def index
    result = TimeEntry::List.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result["result.policy.default"].success? ? :ok : :unauthorized
    )
  end

  def show
    result = TimeEntry::Show.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def create
    user_hash = {user: current_user}

    result = TimeEntry::Create.(params.merge(user_hash), {'current_user' => current_user})
    status = result.success? ? :ok : :unprocessable_entity

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def update
    user_hash = {user: current_user}

    result = TimeEntry::Update.(params.merge(user_hash), {'current_user' => current_user})

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def destroy
    user_hash = {user: current_user}

    result = TimeEntry::Destroy.(params.merge(user_hash), {'current_user' => current_user})

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end
end
