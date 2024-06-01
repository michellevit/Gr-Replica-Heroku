module Api
  class UsersController < BaseController
    def create
      user = User.new(user_params)

      if user.save
        session[:user_id] = user.id
        render json: { message: 'User created successfully' }, status: :created
      else
        render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password)
    end
  end
end