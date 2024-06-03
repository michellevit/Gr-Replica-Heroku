module Api
  class SessionsController < BaseController
    def create
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { loggedIn: true, user: user }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    rescue => e
      Rails.logger.error("Error in SessionsController#create: #{e.message}")
      render json: { error: 'Internal Server Error' }, status: :internal_server_error
    end

    def check_logged_in
      if logged_in?
        render json: { loggedIn: true, user: current_user }
      else
        render json: { loggedIn: false }
      end
    end

    def logout
      if logged_in?
        reset_session
        render json: { message: 'Logged out successfully' }, status: :ok
      else
        render json: { error: 'No user logged in' }, status: :unprocessable_entity
      end
    rescue => e
      Rails.logger.error("Error in SessionsController#logout: #{e.message}")
      render json: { error: 'Internal Server Error' }, status: :internal_server_error
    end
  end
end
