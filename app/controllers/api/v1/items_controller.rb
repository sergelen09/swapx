class Api::V1::ItemsController < ApiController
  def index
    items = Item.items_pending

    render json: {
      items: items
    }
  end

  def show
    item = Item.find(params[:id])
    render json: item, serializer: ItemSerializer, scope: {current_user: current_user}
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
