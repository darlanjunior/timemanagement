class TimeEntry < ApplicationRecord
  belongs_to :user
  has_many :notes, :dependent => :delete_all
end
