class Api::V1::UsersController < ApiController
  def index
    if current_user
      user = current_user
      items_near = Item.near(user.location)
      logged_in = true
    else
      user = false
      items_near = []
      logged_in = false
    end

    items = Item.all
    offers = Offer.all

    render json: {
      user: user,
      items: items,
      items_near: items_near,
      logged_in: logged_in,
      offers: offers
    }
  end
end
