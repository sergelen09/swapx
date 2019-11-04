class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :photo, :current_user, :traded_item_info

  def current_user
    scope[:current_user]
  end

  def traded_item_info
    object.traded_item
  end
end
