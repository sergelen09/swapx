class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :offer
  belongs_to :user
end
