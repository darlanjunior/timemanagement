class Manager < User
  validates :preferred_working_hours, absence: true
end
