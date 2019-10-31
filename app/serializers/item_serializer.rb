class ItemSerializer < ActiveModel::Serializer
<<<<<<< HEAD
  attributes :id, :title, :description
=======
  attributes :id, :title, :description, :current_user

  def current_user
    scope[:current_user]
  end
>>>>>>> d9dc4fa8f2613f5154ff3e86ced6c0f330f5c8eb
end
