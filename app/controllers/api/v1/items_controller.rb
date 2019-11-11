class Api::V1::ItemsController < ApiController
  def index
    if params["/items"]
      if params["/items"]["search"] != ""
        search_results = Item.where({ category: params["/items"]["search"].downcase })
        if search_results.length == 0
          search_results = Item.near(params["/items"]["search"])
          if search_results.length == 0
            items = search_results
          else
            items = Item.no_user_items(search_results).reverse
            items = Item.items_pending(items)
          end
        else
          items = Item.no_user_items(search_results).reverse
          items = Item.items_pending(items)
        end
        items = Item.no_user_items(search_results).reverse
        items = Item.items_pending(items)
      else
        if current_user
          items = Item.all_except(current_user)
          items = Item.items_pending(items)
        else
          items = Item.items_pending(Item.all).reverse
        end
      end
    else
      if current_user
        items = Item.all_except(current_user)
        items = Item.items_pending(items)
      else
        items = Item.items_pending(Item.all).reverse
      end
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
    if params["click"]
      if params["click"] == "newest"
        if current_user
          items = Item.all_except(current_user)
          items = Item.items_pending(items)
        else
          items = Item.items_pending(Item.all).reverse
        end
      else
        items = Item.where({ category: params["click"] })
        items = Item.no_user_items(items).reverse
        items = Item.items_pending(items)
      end

      if items.empty?
        render json: { items: [] }
      else
        render json: items, each_serializer: ItemSerializer, scope: {current_user: current_user, logged_in: user_signed_in?}
      end
    else
      item = Item.new(
        title: params[:title],
        description: params[:description],
        location: params[:location],
        category: params[:category],
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
end
