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
    property :duration
  end
end
