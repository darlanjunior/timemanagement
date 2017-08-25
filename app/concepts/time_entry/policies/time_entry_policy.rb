class TimeEntryPolicy
  def initialize(user, model)
    @user, @model = user, model
  end

  def list?
    !(!@user || @user.role == 'Manager')
  end

  def show?
    !(
      !@user ||
      @user.role == 'Manager' ||
      (@model.end_user != @user && @user.role == 'EndUser')
      )
  end

  def create?
    if !@user ||
        @user.role == 'Manager'
      return false
    end

    true
  end

  def update?
    if !@user ||
        @user.role == 'Manager' ||
        (@user.role == 'Admin' && @model.end_user == @user) ||
        (@user.role == 'EndUser' && @model.end_user != @user)
      return false
    end

    true
  end

  def destroy?
    if !@user ||
        @user.role == 'Manager' ||
        (@user.role == 'Admin' && @model.end_user == @user) ||
        (@user.role == 'EndUser' && @model.end_user != @user)
      return false
    end

    true
  end
end
