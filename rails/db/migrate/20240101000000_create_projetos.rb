class CreateProjetos < ActiveRecord::Migration[8.0]
  def change
    create_table :projetos do |t|
      t.string  :titulo,      null: false
      t.string  :coordenador, null: false
      t.string  :curso,       null: false
      t.integer :ano,         null: false
      t.string  :status,      null: false, default: "ativo"
    end
  end
end
