# app/controllers/api/passwords_controller.rb
module Api
    class PasswordsController < ApplicationController
      protect_from_forgery with: :null_session
  
      def forgot
        user = User.find_by(email: params[:email])
        if user
          user.generate_password_token!
          UserMailer.forgot_password(user).deliver_now
          render json: { message: 'Reset password instructions have been sent to your email.' }, status: :ok
        else
          render json: { error: 'Email address not found. Please check and try again.' }, status: :not_found
        end
      end
  
      def reset
        token = params[:token].to_s
        user = User.find_by(reset_password_token: token)
  
        if user && user.password_token_valid?
          if user.reset_password!(params[:password])
            render json: { message: 'Your password has been successfully reset.' }, status: :ok
          else
            render json: { error: user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Invalid or expired token.' }, status: :not_found
        end
      end
    end
  end
  