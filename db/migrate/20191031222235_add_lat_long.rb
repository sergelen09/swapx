class AddLatLong < ActiveRecord::Migration[5.2]
  def up
    add_column :items, :latitude, :float
    add_column :items, :longitude, :float
  end
  def down
    remove_column :items, :latitude
    remove_column :items, :longitude
  end
end
