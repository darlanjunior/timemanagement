class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.string :text
      t.references :time_entry, foreign_key: true

      t.timestamps
    end
  end
end
