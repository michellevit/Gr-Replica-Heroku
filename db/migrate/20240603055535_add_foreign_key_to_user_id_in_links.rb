class AddForeignKeyToUserIdInLinks < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :links, :users, column: :user_id
  end
end
