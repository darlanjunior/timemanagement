require 'roar/decorator'
require 'roar/json'
require 'roar/json/json_api'

class TimeEntryRepresenter < Roar::Decorator
  include Roar::JSON::JSONAPI.resource :time_entries

  meta toplevel: true do
    property :count
  end

  attributes do
    property :name
    property :description
    property :date
    property :duration, getter: ->(represented:, **) { represented.duration.strftime('%H:%M') }
    property :green,
      getter: ->(user_options:, represented:, **) {
        baseline = Time.zone.parse('Jan 2000')
        date_duration_sum = user_options[:date_duration_sum][represented.date]
        entry_duration = Time.zone.parse(date_duration_sum, baseline)
        user_hours = user_options[:preferred_working_hours]

        entry_duration >= user_hours
      }
  end
end
