require_relative './policies/note_policy'
class Note::Destroy < Trailblazer::Operation
  step Model(Note, :find_by)
  step Policy::Pundit( NotePolicy, :destroy? )
  failure :unauthorized_response!, fail_fast: true
  step :destroy!
  success :success!
  failure :internal_error!

  def invalid_request!(options)
    options[:'status'] = :invalid_request
    options[:'result.json'] = {
      status: 'error',
      error: 'Not allowed to remove note'
    }
  end

  def unauthorized_response!(options)
    options[:'status'] = :unauthorized
    options[:'result.json'] = {
      status: 'error',
      error: 'Not allowed to remove note'
    }
  end

  def destroy!(options, model:, **)
    model.destroy
  end

  def success!(options, **)
    options[:'status'] = :ok
    options[:'result.json'] = {
      status: 'success',
      message: 'Note removed'
    }
  end

  def internal_error!(options, **)
    options[:'status'] = :internal_error
    options[:'result.json'] = {
      status: 'error',
      error: 'An error occurred'
    }
  end
end
