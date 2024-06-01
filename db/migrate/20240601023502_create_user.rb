class CreateUser < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :payment_address
      t.string :name
      t.string :password, null: false
      t.string :reset_hash
      t.float :balance, default: 0.00

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
