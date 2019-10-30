class CreateOffers < ActiveRecord::Migration[5.2]
  def change
    create_table :offers do |t|
      t.belongs_to :swappee
      t.belongs_to :swapper
    end
  end
end
