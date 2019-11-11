class Api::V1::OffersController < ApiController
  def index
    user = current_user
    items = user.items.filter{ |item| item.available }

    if items.empty?
      render json: { items: [] }
    else
      render json: items
    end
  end

  def create
    itemOffered = Item.find(params["offeredItem"])
    itemTraded = Item.find(params["selectedItem"])
    offer = Offer.new(status: "pending")
    offer.offered_item = itemOffered
    offer.traded_item = itemTraded

    offer.save

    render json: {
      item: itemTraded,
      offer: offer
    }
  end

  def update
    offer = Offer.find(params["offer"])
    offer.status = "accepted"
    offer.save

    render json: {
      offer: offer.status
    }
  end

  def destroy
    Offer.find(params["offer"]).delete
    item = Item.find(params["item"]["id"])

    render json: item, serializer: ItemSerializer, scope: {current_user: current_user, logged_in: user_signed_in?}
  end
end
