require_relative './policies/user_policy'
require_relative './contracts/create'
class User::Create < Trailblazer::Operation
  step Model(User)
  step :generate_password!
  step Contract::Build( constant: User::Contract::Create )
  step Contract::Validate()
  failure :invalid_model!, fail_fast: true
  step Contract::Persist()
  step Policy::Pundit( UserPolicy, :create? )
  failure :rollback!
  failure :unauthorized_response!, fail_fast: true
  step :skip_confirmation!
  step :send_mail!
  success :success!
  failure :internal_error!

  def rollback!(options, model:, **)
    model.destroy
  end

  def generate_password!(options, params:, **)
    params[:password] = Devise.friendly_token.first(8)
  end

  def skip_confirmation!(options, model:, **)
    model.skip_confirmation!
    model.save
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
      errors: ['An error occurred']
    }
  end
end
