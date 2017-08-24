require 'reform/form/dry'

module Note::Contract
  class Create < Reform::Form
    feature Reform::Form::Dry
    property :text
    property :time_entry_id

    validation :default do
      required(:text).filled
      required(:time_entry_id).filled
    end
  end
end
