class UserSerializer < ActiveModel::Serializer
  attributes :id, :location, :username, :logged_in

  def logged_in
    true
  end

  has_many :items
  has_many :comments
end
