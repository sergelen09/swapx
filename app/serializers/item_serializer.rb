class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :current_user

  def current_user
    scope[:current_user]
  end
end
