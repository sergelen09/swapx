class LayoutsController < ApplicationController
  def index
    @items = Item.count
  end
end
