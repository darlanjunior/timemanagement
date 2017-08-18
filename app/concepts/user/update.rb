require_relative './policies/user_policy'
require_relative './contracts/update'
class User::Update < Trailblazer::Operation
  step Model(User, :find_by)
  step Contract::Build( constant: User::Contract::Update )
  step Contract::Validate()
  failure :invalid_model!, fail_fast: true
  step Policy::Pundit( UserPolicy, :update? )
  failure :unauthorized_response!, fail_fast: true
  step Contract::Persist()
  success :success!
  failure :internal_error!

  def generate_password!(options, params:, **)
    params[:password] = Devise.friendly_token.first(8)
  end

  def send_mail!(options, params:, **)
    UserMailer.welcome_email(options['model'], params[:password]).deliver_later

    true
  end

  def invalid_model!(options, **)
    options[:'status'] = :unprocessable_entity
    options[:'result.json'] = {
      status: 'error',
      errors: options['contract.default'].errors.full_messages
    }
  end

  def unauthorized_response!(options, params:, **)
    options[:'status'] = :unauthorized
    options[:'result.json'] = {
      status: 'error',
      errors: ["Not allowed to create #{params['role']}"]
    }
  end

  def success!(options, **)
    options[:'status'] = :ok
    options[:'result.json'] = {
      status: 'success',
      message: 'User created'
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
