class UserPolicy
  def initialize(user, model)
    @user, @model = user, model
  end

  def list?
    @user && @user.role != 'EndUser'
  end

  def create?
    @user && @user.role != 'EndUser'
  end

  def update?
    @user && is_hierarchically_superior(@user, @model)
  end

  def destroy?
    @user && is_hierarchically_superior(@user, @model)
  end

  private
  def is_hierarchically_superior user, target
    @hierarchy ||= ['Admin','Manager','EndUser']

    @hierarchy.index(user.role) < @hierarchy.index(target.role)
  end
end
