# app/models/user.rb
class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  def generate_password_token!
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.now.utc
    save(validate: false)  
  end

  def password_token_valid?
    (self.reset_password_sent_at + 1.hour) > Time.now.utc
  end

  def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end

  private

  def generate_token
    SecureRandom.hex(10)
  end
end
