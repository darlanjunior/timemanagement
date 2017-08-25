class User < ActiveRecord::Base
  self.inheritance_column = :role
  # Include default devise modules.
  devise :database_authenticatable, :recoverable, :validatable, :registerable, :confirmable
  include DeviseTokenAuth::Concerns::User
  after_initialize :default_role

  def default_role
    self.role  ||= 'EndUser'
  end

  has_many :time_entries, :dependent => :delete_all
  has_one :live_task, :dependent => :delete
  validate :preferred_working_hours, :cannot_be_zero
  after_initialize :init

  def init
    self.preferred_working_hours  ||= '00:00:01'
  end

  def cannot_be_zero
    if (
      !preferred_working_hours || (
      preferred_working_hours.hour == 0 &&
      preferred_working_hours.min == 0 &&
      preferred_working_hours.sec == 0
    ))
      errors.add(:preferred_working_hours, 'invalid format')
    end
  end

  def as_json(except: nil, prefixes: nil, template: nil)
    formatted = preferred_working_hours && preferred_working_hours.strftime('%H:%M')

    {
      id: self.id,
      email: self.email,
      name: self.name,
      role: self.role,
      preferred_working_hours: formatted
    }
  end
end
