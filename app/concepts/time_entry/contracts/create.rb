require 'reform/form/dry'
require "reform/form/coercion"

module TimeEntry::Contract
  class Create < Reform::Form
    feature Reform::Form::Dry
    feature Coercion
    property :name
    property :description
    property :user
    property :date, type: Types::Form::Date
    property :duration

    validation :default do
      required(:user).filled
      required(:name).filled
      required(:date).filled(:date?)
      required(:duration).filled(:time?)
    end

    validation :duration, after: :default, with: {form: true} do
      configure do
        config.messages_file = 'config/error_messages.yml'

        def seconds_from_epoch time
          baseline = Time.zone.parse('00:00').to_i
          Time.zone.parse(time).to_i - baseline
        end

        def less_than_a_day?(duration)
          date = self.options[:form].date
          user = self.options[:form].user
          duration_at_date = TimeEntry.where(date: date, user: user).sum(:duration)

          total_duration = seconds_from_epoch(duration_at_date)
          added = seconds_from_epoch(duration)

          total_duration + added < 24*60*60
        end
      end

      required(:duration).filled(:less_than_a_day?)
    end

  end
end
