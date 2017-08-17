class UserPolicy
  def initialize(user, model)
    @user, @model = user, model
  end

  def list?
    return false if !@user
    ['Admin', 'Manager'].include? @user.role
  end
end
