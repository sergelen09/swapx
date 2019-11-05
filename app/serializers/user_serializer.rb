class UserSerializer < ActiveModel::Serializer
  attributes :id, :location, :username, :logged_in

  def logged_in
    true
  end
end
