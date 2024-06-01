class CreateLink < ActiveRecord::Migration[7.1]
  def change
    create_table :links do |t|
      t.string :owner, null: false
      t.string :name, null: false
      t.string :unique_permalink, null: false
      t.string :url, null: false
      t.string :preview_url
      t.text :description
      t.float :price, null: false, default: 1.00
      t.datetime :create_date, default: -> { 'CURRENT_TIMESTAMP' }
      t.integer :length_of_exclusivity, default: 0
      t.integer :number_of_paid_downloads, default: 0
      t.integer :number_of_downloads, default: 0
      t.integer :download_limit, default: 0
      t.integer :number_of_views, default: 0
      t.float :balance, default: 0.00

      t.timestamps
    end
  end
end