class TimeEntriesController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::MimeResponds

  before_action :set_user
  def index
    result = TimeEntry::List.(params, user: @user, 'current_user' => current_user)


    respond_to do |format|
      format.json {
        render(
          json: result[:'result.json'],
          status: result["result.policy.default"].success? ? :ok : :unauthorized
        )
      }

      @result = result[:'result']
      format.html {
        render json: {oi: render_to_string(:template => 'time_entries/index')}
      }
    end
  end

  # render(
  #   json:
  # )

  def show
    result = TimeEntry::Show.(params, user: @user, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def create
    result = TimeEntry::Create.(
      params.merge({user: @user}),
      'current_user' => current_user
    )

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def update
    result = TimeEntry::Update.(
      params.merge({user: @user}),
      'current_user' => current_user
    )

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def destroy
    result = TimeEntry::Destroy.(
      params.merge({user: @user}),
      'current_user' => current_user
    )

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  private
  def set_user
    @user = current_user.role == 'Admin' ?
      User.find(params[:user_id]) :
      current_user
  end
end
