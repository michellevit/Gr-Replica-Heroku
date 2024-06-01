class BaseController < ActionController::Base
    helper_method :current_user, :logged_in?

    private

    def current_user
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
    rescue ActiveRecord::RecordNotFound
        session[:user_id] = nil
        nil
    end

    def logged_in?
        !!current_user
    end
    
end