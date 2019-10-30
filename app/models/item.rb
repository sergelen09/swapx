class Item < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_one :offered_for_bid
  has_one :offered_item, :through => :offered_for_bid

  has_one :offered_for_trade
  has_one :traded_item, :through => :offered_for_trade

  belongs_to :user
end
