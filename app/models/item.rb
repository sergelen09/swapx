class Item < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_one :offered_for_bid, class_name: "Offer",
  foreign_key: 'offered_item_id'

  has_one :traded_item, :through => :offered_for_bid,
  source: :traded_item

  has_one :offered_for_trade, class_name: "Offer",
  foreign_key: 'traded_item_id'

  has_one :offered_item, :through => :offered_for_trade,
  source: :offered_item

  belongs_to :user

  geocoded_by :address
  after_validation :geocode

  def address
    [location].compact.join(', ')
  end
end
