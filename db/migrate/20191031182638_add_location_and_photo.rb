class AddLocationAndPhoto < ActiveRecord::Migration[5.2]
  def up
    add_column :items, :photo, :string
    add_column :items, :location, :string, null: false
    add_column :users, :username, :string, null: false
    add_column :users, :location, :string, null: false
  end
  def down
    remove_column :items, :photo
    remove_column :items, :location
    remove_column :users, :username
    remove_column :users, :location
  end
end
