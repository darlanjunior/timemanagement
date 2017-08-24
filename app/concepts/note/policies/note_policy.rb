class NotePolicy
  def initialize(user, model)
    @user, @model = user, model
  end

  def create?
    if !@user ||
        @user.role == 'Manager' ||
        (@model.time_entry.end_user != @user && @user.role == 'EndUser')
      return false
    end

    true
  end

  def destroy?
    if !@user ||
        @user.role == 'Manager' ||
        (@user.role == 'Admin' && @model.time_entry.end_user == @user) ||
        (@user.role == 'EndUser' && @model.time_entry.end_user != @user)
      return false
    end

    true
  end
end
