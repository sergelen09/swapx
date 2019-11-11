class AddCategories < ActiveRecord::Migration[5.2]
  def up
    add_column :items, :category, :string
  end

  def down
    remove_column :items, :category
  end
end
