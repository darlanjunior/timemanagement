class CreateLiveTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :live_tasks do |t|
      t.string :name
      t.text :description
      t.datetime :start
      t.references :user, foreign_key: 'user_id'

      t.timestamps
    end
  end
end
