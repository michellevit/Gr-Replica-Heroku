# app/mailers/user_mailer.rb
class UserMailer < ApplicationMailer
    default from: 'info@michellef.dev'
  
    def forgot_password(user)
      @user = user
      @url = "http://michellef.dev/reset-password?token=#{user.reset_password_token}"
      mail(to: @user.email, subject: 'Reset your password')
    end
  end
  