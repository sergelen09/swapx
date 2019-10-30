class Api::V1::ItemsController < ApiController
  def index
    items = Item.all

    render json: {
      items: items
    }
  end

  def create
  item = Item.new(item_params)
  item.user = current_user
  
  if item.save
    render json: item
  else
    render json: {
      errors: item.errors.messages,
      fields: item
    }
  end
end

  private

  def item_params
    params.require(:item).permit(:title, :description)
  end
end
