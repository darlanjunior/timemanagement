module User::Contract
  class Create < Reform::Form
    property :email
    property :name
    property :role
    property :password

    validates :email, presence: true
    validates :name, presence: true
    validates :password, presence: true
    validates :role,
      presence: true,
      inclusion: {
        in: %w(Admin Manager EndUser),
        message: "%{value} is not a valid role"
      }
  end
end
