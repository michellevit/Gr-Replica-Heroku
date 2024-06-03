# app/controllers/api/passwords_controller.rb


module Api
  class PasswordsController < BaseController
    protect_from_forgery with: :null_session
    Rails.logger.info "YOU'RE IN!!!!!!!!!!!!!!!"
    def forgot
      if params[:email].blank?
        return render json: { error: 'Email not present' }, status: :unprocessable_entity
      end
    
      user = User.find_by(email: params[:email].downcase)
      
      if user.present?
        user.generate_password_token!
        UserMailer.forgot_password(user).deliver_now
        render json: { status: 'ok', message: 'A reset password link has been sent to your email.' }
      else
        render json: { error: 'Email address not found. Please check and try again.' }, status: :not_found
      end
    end
    
    def reset
      user = User.find_by(email: params[:email], reset_password_token: params[:resetHash])

      if user && user.password_token_valid?
        if user.reset_password!(params[:password])
          render json: { message: 'Password reset successfully' }, status: :ok
        else
          render json: { error: 'Failed to reset password' }, status: :unprocessable_entity
        end
      else
        render json: { error: 'Invalid token or email' }, status: :unprocessable_entity
      end
    rescue => e
      Rails.logger.error("Error in PasswordsController#reset: #{e.message}")
      render json: { error: 'Internal Server Error' }, status: :internal_server_error
    end
  end
end
