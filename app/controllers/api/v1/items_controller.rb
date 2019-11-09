class Api::V1::ItemsController < ApiController
  def index
    if current_user
      items = Item.all_except(current_user)
      items = Item.items_pending(items)
    else
      items = Item.items_pending(Item.all)
    end

    if items.empty?
      render json: { items: [] }
    else
      render json: items, each_serializer: ItemSerializer, scope: {current_user: current_user, logged_in: user_signed_in?}
    end
  end

  def show
    item = Item.find(params[:id])
    render json: item, serializer: ItemSerializer, scope: {current_user: current_user, logged_in: user_signed_in?}
  end

  def create
    item = Item.new(
      title: params[:title],
      description: params[:description],
      location: params[:location],
      photo: params[:photo]
    )
    item.user = current_user

    if item.save
      item.geocode
      item.save
      render json: item
    else
      render json: {
        errors: item.errors.messages,
        fields: item
      }
    end
  end
end
