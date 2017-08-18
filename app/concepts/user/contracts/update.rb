module User::Contract
  class Update < Reform::Form
    property :name
    property :role

    validates :role,
      inclusion: {
        in: %w(Admin Manager EndUser),
        message: "%{value} is not a valid role"
      }
  end
end
