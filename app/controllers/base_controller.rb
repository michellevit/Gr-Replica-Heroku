class BaseController < ActionController::Base
  helper_method :current_user, :logged_in?
  skip_before_action :verify_authenticity_token, if: -> { request.format.json? }
  protect_from_forgery with: :null_session, if: -> { request.format.json? }

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  rescue ActiveRecord::RecordNotFound
    session[:user_id] = nil
    nil
  end

  def logged_in?
    !!current_user
  end

  def authenticate_user!
    unless logged_in?
      render json: { error: 'You need to log in to access this resource' }, status: :unauthorized
    end
  end
end
