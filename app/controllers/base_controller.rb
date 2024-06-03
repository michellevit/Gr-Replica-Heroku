# app/controllers/base_controller.rb

class BaseController < ActionController::Base
  helper_method :current_user, :logged_in?
  skip_before_action :verify_authenticity_token, if: -> { request.format.json? }
  protect_from_forgery with: :null_session, if: -> { request.format.json? }

  private

  def current_user
    if session[:user_id]
      Rails.logger.info "Session user_id: #{session[:user_id]}"
      @current_user ||= User.find_by(id: session[:user_id])
    else
      Rails.logger.info "No session user_id found"
      @current_user = nil
    end
  rescue ActiveRecord::RecordNotFound
    session[:user_id] = nil
    nil
  end

  def logged_in?
    !!current_user
  end

  def authenticate_user!
    Rails.logger.info "Authenticating user..."
    if logged_in?
      Rails.logger.info "User is logged in: #{current_user.id}"
    else
      Rails.logger.info "User is not logged in"
      render json: { error: 'You need to log in to access this resource' }, status: :unauthorized
    end
  end
end
