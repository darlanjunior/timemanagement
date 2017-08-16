class User < ActiveRecord::Base
  self.inheritance_column = :role
  # Include default devise modules.
  devise :database_authenticatable, :recoverable, :validatable
  include DeviseTokenAuth::Concerns::User

  def as_json(except: nil, prefixes: nil, template: nil)
    {
      id: self.id,
      email: self.email,
      name: self.name,
      role: self.role
    }
  end
end
