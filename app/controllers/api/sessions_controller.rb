module Api
  class SessionsController < BaseController
    def check_logged_in
      if logged_in?
        render json: { loggedIn: true, user: current_user }
      else
        render json: { loggedIn: false }
      end
    end
  end
end