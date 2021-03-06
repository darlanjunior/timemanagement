require_relative './policies/time_entry_policy'
class TimeEntry::Destroy < Trailblazer::Operation
  step Model(TimeEntry, :find_by)
  step Policy::Pundit( TimeEntryPolicy, :destroy? )
  failure :unauthorized_response!, fail_fast: true
  step :destroy!
  success :success!
  failure :internal_error!

  def invalid_request!(options)
    options[:'status'] = :invalid_request
    options[:'result.json'] = {
      status: 'error',
      errors: ['Not allowed to remove time entry']
    }
  end

  def unauthorized_response!(options)
    options[:'status'] = :unauthorized
    options[:'result.json'] = {
      status: 'error',
      errors: ['Not allowed to remove time entry']
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
      message: 'Time entry removed'
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
