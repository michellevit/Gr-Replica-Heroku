# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_02_191917) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "files", force: :cascade do |t|
    t.string "unique_permalink", null: false
    t.string "blob_key"
    t.string "file_name"
    t.string "file_type"
    t.datetime "date", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "links", force: :cascade do |t|
    t.string "owner", null: false
    t.string "name", null: false
    t.string "unique_permalink", null: false
    t.string "url", null: false
    t.string "preview_url"
    t.text "description"
    t.float "price", default: 1.0, null: false
    t.datetime "create_date", default: -> { "CURRENT_TIMESTAMP" }
    t.integer "length_of_exclusivity", default: 0
    t.integer "number_of_paid_downloads", default: 0
    t.integer "number_of_downloads", default: 0
    t.integer "download_limit", default: 0
    t.integer "number_of_views", default: 0
    t.float "balance", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "permalinks", force: :cascade do |t|
    t.string "permalink", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "purchases", force: :cascade do |t|
    t.string "owner", null: false
    t.string "unique_permalink", null: false
    t.float "price", null: false
    t.datetime "create_date", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "payment_address"
    t.string "name"
    t.string "reset_hash"
    t.float "balance", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
