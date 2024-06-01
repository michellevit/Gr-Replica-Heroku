class CreatePermalink < ActiveRecord::Migration[7.1]
  def change
    create_table :permalinks do |t|
      t.string :permalink, null: false

      t.timestamps
    end
  end
end
