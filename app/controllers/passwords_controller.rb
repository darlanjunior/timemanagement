class PasswordsController < DeviseTokenAuth::PasswordsController
  protected
  def render_create_success
    render json: {
      status: 'success',
      message: I18n.t("devise_token_auth.passwords.sended", email: @email)
    }
  end

  def render_create_error_missing_email
     render json: {
       status: 'error',
       errors: [I18n.t("devise_token_auth.passwords.missing_email")]
     }, status: 401
   end

   def render_create_error_missing_redirect_url
     render json: {
       status: 'error',
       errors: [I18n.t("devise_token_auth.passwords.missing_redirect_url")]
     }, status: 401
   end

   def render_create_error_not_allowed_redirect_url
     render json: {
       status: 'error',
       data:   resource_data,
       errors: [I18n.t("devise_token_auth.passwords.not_allowed_redirect_url", redirect_url: @redirect_url)]
     }, status: 422
   end

   def render_create_error
     render json: {
       status: 'error',
       errors: @errors,
     }, status: @error_status
   end

   def render_update_error_unauthorized
     render json: {
       status: 'error',
       errors: ['Unauthorized']
     }, status: 401
   end

   def render_update_error_password_not_required
     render json: {
       status: 'error',
       errors: [I18n.t("devise_token_auth.passwords.password_not_required", provider: @resource.provider.humanize)]
     }, status: 422
   end

   def render_update_error_missing_password
     render json: {
       status: 'error',
       errors: [I18n.t("devise_token_auth.passwords.missing_passwords")]
     }, status: 422
   end

   def render_update_success
     render json: {
       status: 'success',
       data: resource_data,
       message: I18n.t("devise_token_auth.passwords.successfully_updated")
     }
   end

   def render_update_error
     return render json: {
       status: 'error',
       errors: resource_errors
     }, status: 422
   end
end
