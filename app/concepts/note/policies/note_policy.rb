class NotePolicy
  def initialize(user, model)
    @user, @model = user, model
  end

  def create?
    @user && (@model.time_entry.user == @user || @user.role == 'Admin')
  end

  def destroy?
    @user && (@model.time_entry.user == @user || @user.role == 'Admin')
  end
end
