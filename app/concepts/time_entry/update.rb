require_relative './policies/time_entry_policy'
require_relative './contracts/update'
class TimeEntry::Update < Trailblazer::Operation
  step Model(TimeEntry, :find_by)
  step Contract::Build( constant: TimeEntry::Contract::Update )
  step Contract::Validate()
  failure :invalid_model!, fail_fast: true
  step Policy::Pundit( TimeEntryPolicy, :update? )
  failure :unauthorized_response!, fail_fast: true
  step Contract::Persist()
  success :success!
  failure :internal_error!


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
