class CreateOffers < ActiveRecord::Migration[5.2]
  def change
    create_table :offers do |t|
      t.string :status, null: false

      t.belongs_to :offered_item
      t.belongs_to :traded_item

      t.timestamps
    end
  end
end
