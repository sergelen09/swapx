class Item < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_one :offered_for_bid, class_name: "Offer",
  foreign_key: 'offered_item_id'

  has_one :offered_for_trade, class_name: "Offer",
  foreign_key: 'traded_item_id'

  belongs_to :user
end
