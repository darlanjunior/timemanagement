require_relative './representers/time_entry_representer'
require_relative './policies/time_entry_policy'
class TimeEntry::List < Trailblazer::Operation
  step :set_variables!
  step Policy::Pundit( TimeEntryPolicy, :list? )
  failure :unauthorized_response!
  step Nested( ::Page::List )
  step :filter_dates!
  step :represent!

  def unauthorized_response!(options)
    options[:'result.json'] = {
      error: 'Not allowed to list time entries'
    }
  end

  def set_variables!(options, params:, **)
    params[:model] = ::TimeEntry
    params[:searchable_fields] = [:name, :email]
    params[:page] = params[:page] || 1
    params[:items_per_page] = params[:items_per_page] || 5
  end

  def filter_dates!(options, params:, **)
    startDate = params[:startDate]
    endDate = params[:endDate]

    if(startDate)
      options[:'result'] = options[:'result'].where('date > ?', DateTime.parse(startDate))
    end
    if(endDate)
      options[:'result'] = options[:'result'].where('date < ?', DateTime.parse(endDate))
    end

    true
  end

  def represent!(options, result:, count:, **)
    options[:'result.json'] =
      TimeEntryRepresenter
        .for_collection
        .new(result)
        .to_json(meta: {count: count})
  end
end
