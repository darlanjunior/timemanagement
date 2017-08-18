require_relative './policies/user_policy'
class User::Destroy < Trailblazer::Operation
  step Model(User, :find_by)
  step Policy::Pundit( UserPolicy, :destroy? )
  failure :unauthorized_response!
  step :destroy!
  success :success!
  failure :internal_error!

  def invalid_request!(options)
    options[:'status'] = :invalid_request
    options[:'result.json'] = {
      status: 'error',
      message: 'Not allowed to remove user'
    }
  end

  def unauthorized_response!(options)
    options[:'status'] = :unauthorized
    options[:'result.json'] = {
      status: 'error',
      message: 'Not allowed to remove user'
    }
  end

  def destroy!(options, model:, **)
    model.destroy!

    model.destroyed?
  end

  def success!(options, **)
    options[:'status'] = :ok
    options[:'result.json'] = {
      status: 'success',
      message: 'User removed'
    }
  end

  def internal_error!(options, **)
    options[:'status'] = :internal_error
    options[:'result.json'] = {
      status: 'error',
      message: 'An error occurred'
    }
  end
end
