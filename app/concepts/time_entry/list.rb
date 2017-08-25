require_relative './representers/time_entry_representer'
require_relative './policies/time_entry_policy'
class TimeEntry::List < Trailblazer::Operation
  step :set_variables!
  step Policy::Pundit( TimeEntryPolicy, :list? )
  failure :unauthorized_response!, fail_fast: true
  step Nested( ::Page::List )
  step :filter_user!
  step :filter_dates!
  step :set_workday_filled_dates!
  step :represent!

  def unauthorized_response!(options)
    options[:'result.json'] = {
      error: 'Not allowed to list time entries'
    }
  end

  def set_variables!(options, params:, **)
    params[:model] = ::TimeEntry
    params[:searchable_fields] = [:name]
    params[:page] = params[:page] || 1
    params[:items_per_page] = params[:items_per_page] || 5
  end

  def filter_user!(options, user:, **)
    options[:'result'] = options[:'result'].where(user: user)
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

  def set_workday_filled_dates!(options, result:, user:, **)
    dates = result.map {|r| r.date }

    options[:date_duration_sum] =
      TimeEntry
        .where(date: dates)
        .where(user: user)
        .group(:date)
        .sum(:duration)
  end

  def represent!(options, result:, count:, date_duration_sum:, user:, **)
    user_hours = user.preferred_working_hours

    user_options = {
      date_duration_sum: date_duration_sum,
      preferred_working_hours: user_hours
    }

    meta = {
      count: count,
      preferred_working_hours: user_hours
    }

    options[:'result.json'] =
      TimeEntryRepresenter
        .for_collection
        .new(result)
        .to_json(user_options: user_options, meta: {count: count})
  end
end
