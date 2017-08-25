class TimeEntryPolicy
  def initialize(user, model)
    @user, @model = user, model
  end

  def list?
    @user && ['Admin', 'EndUser'].include?(@user.role)
  end

  def show?
    exists_and_owns_or_admin
  end

  def create?
    exists_and_owns_or_admin
  end

  def update?
    exists_and_owns_or_admin
  end

  def destroy?
    exists_and_owns_or_admin
  end

  def exists_and_owns_or_admin
    @user && (is_owner || is_admin)
  end

  def is_owner
    @model.user == @user
  end

  def is_admin
    @user.role == 'Admin'
  end
end
