class User < ApplicationRecord
    has_secure_password
    
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence: true
    validates :balance, numericality: { greater_than_or_equal_to: 0 }
  
  end