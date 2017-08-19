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
    property :duration, type: Types::Form::Time

    validation :default do
      required(:user).filled #(type?: ::User)
      required(:name).filled
      required(:date).filled(:date?)
      required(:duration).filled(:time?)
    end


  end
end
