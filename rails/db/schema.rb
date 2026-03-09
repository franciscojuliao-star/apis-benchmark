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

ActiveRecord::Schema[8.1].define(version: 2024_01_01_000000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "enum_projetos_status", ["ativo", "finalizado"]
  create_enum "status_projeto", ["ativo", "finalizado"]
  create_enum "statusenum", ["ativo", "finalizado"]

  create_table "projetos", id: :serial, force: :cascade do |t|
    t.integer "ano", null: false
    t.string "coordenador", limit: 255, null: false
    t.string "curso", limit: 255, null: false
    t.enum "status", default: "ativo", null: false, enum_type: "status_projeto"
    t.string "titulo", limit: 255, null: false
  end
end
