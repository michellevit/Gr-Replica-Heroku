module Api
  class SessionsController < ApplicationController
    def check_logged_in
      if logged_in?
        render json: { loggedIn: true }
      else
        render json: { loggedIn: false }
      end
    end
    
    private
  
    def logged_in?
      !!session[:user_id]
    end
  end
end