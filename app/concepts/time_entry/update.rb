require_relative './policies/time_entry_policy'
require_relative './contracts/update'
class TimeEntry::Update < Trailblazer::Operation
  step Model(TimeEntry, :find_by)
  step Contract::Build( constant: TimeEntry::Contract::Create )
  step Contract::Validate()
  failure :invalid_model!, fail_fast: true
  step Policy::Pundit( TimeEntryPolicy, :update? )
  failure :unauthorized_response!, fail_fast: true
  step Contract::Persist()
  success :success!
  failure :internal_error!

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
      errors: ["Not allowed to update time entry"]
    }
  end

  def success!(options, **)
    options[:'status'] = :ok
    options[:'result.json'] = {
      status: 'success',
      message: 'Time entry updated'
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
