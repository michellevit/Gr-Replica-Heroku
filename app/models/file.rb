class File < ApplicationRecord
    belongs_to :link
  
    validates :file_name, :file_type, :unique_permalink, presence: true
  end
  