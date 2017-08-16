class AddRolesToUsers < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      t.remove :nickname, :image
      t.string :role
    end
  end
end
