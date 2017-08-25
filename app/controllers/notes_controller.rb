class NotesController < ApplicationController
  before_action :authenticate_user!
  def create
    result = Note::Create.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end

  def destroy
    result = Note::Destroy.(params, 'current_user' => current_user)

    render(
      json: result[:'result.json'],
      status: result[:'status']
    )
  end
end
