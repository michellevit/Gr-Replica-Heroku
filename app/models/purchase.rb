class Purchase < ApplicationRecord
    # Validations
    validates :owner, :unique_permalink, :price, presence: true
    validates :price, numericality: { greater_than_or_equal_to: 0 }
  
    # Optional associations
    # belongs_to :user
  
    # Add any necessary callbacks or methods here
  end