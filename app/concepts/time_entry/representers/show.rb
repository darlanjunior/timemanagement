require 'roar/decorator'
require 'roar/json'
require 'roar/json/json_api'

class Show < Roar::Decorator
  include Roar::JSON::JSONAPI.resource :time_entry

  attributes do
    property :name
    property :description
    property :date
    property :duration, getter: ->(represented:, **) { represented.duration.strftime('%H:%M') }
    collection :notes do
      property :id
      property :text
    end
  end
end
