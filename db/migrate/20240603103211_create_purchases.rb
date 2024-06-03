class CreatePurchases < ActiveRecord::Migration[7.1]
  def change
    create_table :purchases do |t|
      t.string :owner, null: false
      t.string :unique_permalink, null: false
      t.float :price, null: false
      t.timestamps
    end
  end
end
