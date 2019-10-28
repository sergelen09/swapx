class Api::V1::ItemsController < ApiController
  def index
    items = Item.all

    render json: {
      items: items
    }
  end
end
