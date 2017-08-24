class User < ActiveRecord::Base

  self.inheritance_column = :role
  # Include default devise modules.
  devise :database_authenticatable, :recoverable, :validatable, :registerable, :confirmable
  include DeviseTokenAuth::Concerns::User
  after_initialize :default_role

  def default_role
    self.role  ||= 'EndUser'
  end

  def as_json(except: nil, prefixes: nil, template: nil)
    {
      id: self.id,
      email: self.email,
      name: self.name,
      role: self.role
    }
  end
end
