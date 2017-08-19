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
    result = TimeEntry::Create.(params, 'current_user' => current_user)
    status = result.success? ? :ok : :unprocessable_entity

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def update
    result = TimeEntry::Update.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def destroy
    result = TimeEntry::Destroy.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end
end
