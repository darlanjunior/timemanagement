require 'roar/decorator'
require 'roar/json'
require 'roar/json/json_api'

class UserRepresenter < Roar::Decorator
  include Roar::JSON::JSONAPI.resource :users

  meta toplevel: true do
    property :count
  end
  
  attributes do
    property :name
    property :email
    property :role
  end
end
