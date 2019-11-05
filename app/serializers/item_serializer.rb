class ItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :description, :location, :photo, :current_user, :traded_item_info, :logged_in, :comments

  def current_user
    scope[:current_user]
  end

  def traded_item_info
    object.traded_item
  end

  def comments
    offer = object.offered_for_bid
    Comment.where(offer: offer)
  end

  def logged_in
    scope[:logged_in]
  end
end
