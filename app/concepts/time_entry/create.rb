require_relative './policies/time_entry_policy'
require_relative './contracts/create'
class TimeEntry::Create < Trailblazer::Operation
  step Model(TimeEntry)
  step Contract::Build( constant: TimeEntry::Contract::Create )
  step Contract::Validate()
  failure :invalid_model!, fail_fast: true
  step Contract::Persist()
  step Policy::Pundit( TimeEntryPolicy, :create? )
  failure :rollback!
  failure :unauthorized_response!, fail_fast: true
  success :success!
  failure :internal_error!

  def rollback!(options, model:, **)
    model.destroy
  end

  def full_messages(errors)
    to_message = lambda do |field|
      lambda {|message| "#{field.to_s.classify} #{message}"}
    end

    errors.keys.map {|field| errors[field].map(&to_message.call(field)) }.flatten
  end

  def invalid_model!(options, **)
    options[:'status'] = :unprocessable_entity
    options[:'result.json'] = {
      status: 'error',
      errors: full_messages(options['contract.default'].errors.messages)
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
      message: 'Time entry created'
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
