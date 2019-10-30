class Offer < ApplicationRecord
  belongs_to :offered_item
  belongs_to :traded_item
end
