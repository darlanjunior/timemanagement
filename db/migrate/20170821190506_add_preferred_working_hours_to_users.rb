class AddPreferredWorkingHoursToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :preferred_working_hours, :time
  end
end
