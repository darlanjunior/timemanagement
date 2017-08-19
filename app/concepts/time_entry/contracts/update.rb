module TimeEntry::Contract
  class Update < Reform::Form
    property :name
    property :description
    property :date
    property :time_start
    property :time_end

    validates :name, presence: true
    validates :date, presence: true, date: true
    validates :time_start, presence: true
    validates :time_end, date: {
      after: :time_start,
      message: 'Ending time must be after starting time'
    }
  end
end
