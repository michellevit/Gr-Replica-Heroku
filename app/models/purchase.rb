# app/models/purchase.rb
class Purchase < ApplicationRecord
    belongs_to :user
    belongs_to :link
  end
  