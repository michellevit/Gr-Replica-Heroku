class CreateFile < ActiveRecord::Migration[7.1]
  def change
    create_table :files do |t|
      t.string :unique_permalink, null: false
      t.string :blob_key
      t.string :file_name
      t.string :file_type
      t.datetime :date, default: -> { 'CURRENT_TIMESTAMP' }

      t.timestamps
    end
  end
end