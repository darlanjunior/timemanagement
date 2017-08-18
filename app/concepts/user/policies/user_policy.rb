class UserPolicy
  def initialize(user, model)
    @user, @model = user, model
  end

  def list?
    return false if !@user
    ['Admin', 'Manager'].include? @user.role
  end

  def create?
    return false if !@user
    ['Admin', 'Manager'].include? @user.role
  end

  def update?
    return false if !@user
    is_hierarchically_superior @user, @model
  end

  def destroy?
    return false if !@user
    is_hierarchically_superior @user, @model
  end

  private
  def is_hierarchically_superior user, target
    return true if user.role == 'Admin'
    return true if user.role == 'Manager' && target.role != 'Admin'
    return false
  end
end
