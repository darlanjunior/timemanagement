require_relative './representers/time_entry_representer'
require_relative './policies/time_entry_policy'
class TimeEntry::List < Trailblazer::Operation
  step :set_variables!
  step Policy::Pundit( TimeEntryPolicy, :list? )
  failure :unauthorized_response!
  step Nested( ::Page::List )
  step :represent!

  def unauthorized_response!(options)
    options[:'result.json'] = {
      error: 'Not allowed to list users'
    }
  end

  def set_variables!(options, params:, **)
    params[:model] = ::TimeEntry
    params[:searchable_fields] = [:name, :email]
    params[:page] = params[:page] || 1
    params[:items_per_page] = params[:items_per_page] || 5
  end

  # def filter_admins!(options, result:, current_user:, **)
  #   result = result.where(user: current_user)
  # end

  def represent!(options, result:, count:, **)
    options[:'result.json'] =
      TimeEntryRepresenter
        .for_collection
        .new(result)
        .to_json(meta: {count: count})
  end
end
