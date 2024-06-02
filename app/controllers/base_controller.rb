class BaseController < ActionController::Base
    helper_method :current_user, :logged_in?
    
    protect_from_forgery with: :null_session, if: -> { request.format.json? }
    before_action :set_csrf_cookie_for_ng
    
    private
    
    def set_csrf_cookie_for_ng
      cookies["CSRF-TOKEN"] = form_authenticity_token if protect_against_forgery?
    end
  
    def verified_request?
      super || valid_authenticity_token?(session, request.headers['X-CSRF-Token'])
    end
  
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
  