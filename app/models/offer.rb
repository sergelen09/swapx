class Offer < ApplicationRecord
  validates :status, presence: true

  belongs_to :offered_item, class_name: "Item"
  belongs_to :traded_item, class_name: "Item"

  has_many :comments
end
