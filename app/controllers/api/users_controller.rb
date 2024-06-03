module Api
  class UsersController < BaseController
    protect_from_forgery with: :null_session, if: -> { request.format.json? }

    def create
      user_params = { email: params[:email], password: params[:password] }

      user = User.new(user_params)

      if user.save
        Rails.logger.info("User created successfully: #{user.inspect}")
        session[:user_id] = user.id
        render json: { message: 'User created successfully' }, status: :created
      else
        Rails.logger.error("User creation failed: #{user.errors.full_messages.join(', ')}")
        render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end

    def update
      user = current_user
      if user
        if user.update(user_params)
          render json: user, status: :ok
        else
          render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
        end
      else
        render json: { error: 'User not found or not logged in' }, status: :unauthorized
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :payment_address)
    end
  end
end
