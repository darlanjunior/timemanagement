class TimeEntry < ApplicationRecord
  belongs_to :end_user, foreign_key: 'user_id'
  has_many :notes
end