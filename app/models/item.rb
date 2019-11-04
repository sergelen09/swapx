class Item < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :photo, presence: true
  validates :location, presence: true

  mount_uploader :photo, PhotoUploader

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

  def self.items_pending
    items = Item.all
    item_array = []
    items.each do |item|
      if item.offered_for_bid != nil
        if item.offered_for_bid.status == "rejected"
          item_array.push(item)
        end
      elsif item.offered_for_trade != nil
        if item.offered_for_trade.status == "rejected"
          item_array.push(item)
        end
      else
        item_array.push(item)
      end
    end
    return item_array
  end

end
