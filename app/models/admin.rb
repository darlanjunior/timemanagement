class Admin < User
  validates :preferred_working_hours, absence: true
end
