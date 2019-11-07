class Api::V1::OffersController < ApiController
  def index
    user = current_user
    items = user.items.filter{ |item| item.available }
    if items.empty?
      render json: {items: []}
    else
      render json: items
    end
  end

  def create
    itemOffered = Item.find(params["offeredItem"]["id"])
    itemTraded = Item.find(params["0"])
    offer = Offer.new(status: "pending")
    offer.offered_item = itemOffered
    offer.traded_item = itemTraded
    binding.pry
    offer.save

    render json: itemTraded
  end
end
