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
    end
    
    def check_logged_in
      if logged_in?
        render json: { loggedIn: true, user: current_user }
      else
        render json: { loggedIn: false }
      end
    end
  end
end