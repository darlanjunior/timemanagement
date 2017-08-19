class TimeEntryPolicy
  def initialize(user, model)
    @user, @model = user, model
  end

  def list?
    return false if !@user || @user.role == 'Manager'

    true
  end

  def create?
    if !@user ||
        @user.role == 'Manager' ||
        @user.role == 'Admin'
      return false
    end

    true
  end

  def update?
    if !@user ||
        @user.role == 'Manager' ||
        (@user.role == 'Admin' && @model.user == @user) ||
        (@user.role == 'EndUser' && @model.user != @user)
      return false
    end

    true
  end

  def destroy?
    if !@user ||
        @user.role == 'Manager' ||
        (@user.role == 'Admin' && @model.user == @user) ||
        (@user.role == 'EndUser' && @model.user != @user)
      return false
    end

    true
  end
end
