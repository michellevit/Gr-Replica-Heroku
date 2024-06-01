class User < ApplicationRecord
    # Validations
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence: true
    validates :balance, numericality: { greater_than_or_equal_to: 0 }
  
    # Optional associations (if you have relationships with other models)
    # For example, if a user has many links:
    # has_many :links, dependent: :destroy
  
    # Add any necessary callbacks or methods here
  end
  