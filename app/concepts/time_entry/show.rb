require_relative './representers/show'
require_relative './policies/time_entry_policy'
class TimeEntry::Show < Trailblazer::Operation
  step Model(TimeEntry, :find_by)
  failure :not_found!
  step Policy::Pundit( TimeEntryPolicy, :show? )
  failure :unauthorized_response!
  step :represent!

  def unauthorized_response!(options)
    options[:'status'] = :unauthorized
    options[:'result.json'] = {
      status: 'error',
      errors: ['Not allowed to show time entry']
    }
  end

  def not_found!(options, **)
    options[:'status'] = :not_found
    options[:'result.json'] = {
      status: 'error',
      errors: ['Could not find time entry']
    }
  end

  def represent!(options, model:, **)
    options[:'result.json'] = Show.new(model)
  end
end
