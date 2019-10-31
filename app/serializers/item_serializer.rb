class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :current_user, :offered_item

  def current_user
    scope[:current_user]
  end

  def offered_item
    if object.offered_for_bid == nil
      offered_item = true
    else
    object.offered_for_bid.traded_item
    end
  end
end
