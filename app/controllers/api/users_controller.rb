# app/controllers/api/users_controller.rb
module Api
  class UsersController < BaseController
    protect_from_forgery with: :null_session

    def create
      Rails.logger.info("Received parameters: #{params.inspect}")

      # Extract the email and password from the parameters
      email = params[:email]
      password = params[:password]
      user_params = { email: email, password: password }

      Rails.logger.info("Permitted user parameters: #{user_params.inspect}")

      user = User.new(user_params)
      Rails.logger.info("User object before save: #{user.inspect}")

      if user.save
        Rails.logger.info("User created successfully: #{user.inspect}")
        session[:user_id] = user.id
        render json: { message: 'User created successfully' }, status: :created
      else
        Rails.logger.error("User creation failed: #{user.errors.full_messages.join(', ')}")
        render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end
  end
end
