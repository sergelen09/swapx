class ItemSerializer < ActiveModel::Serializer
  attributes :id, :user, :title, :description, :location, :category, :photo, :current_user, :traded_item_info, :logged_in, :comments, :trade_user, :offer

  belongs_to :user

  def current_user
    scope[:current_user]
  end

  def traded_item_info
    object.traded_item
  end

  def trade_user
    if object.traded_item != nil
      object.traded_item.user
    end
  end

  def comments
    offer = object.offered_for_bid
    Comment.where(offer: offer)
  end

  def logged_in
    scope[:logged_in]
  end

  def offer
    if object.offered_for_bid != nil
      object.offered_for_bid
    else
      object.offered_for_trade
    end
  end
end
