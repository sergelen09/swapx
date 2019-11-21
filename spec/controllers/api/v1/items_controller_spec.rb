require "rails_helper"

RSpec.describe Api::V1::ItemsController, type: :controller do
  let!(:user1) { User.create(
    email: "john@gmail.com",
    password: "john123",
    location: "Boston, MA",
    username: "john"
  ) }

  let!(:user2) { User.create(
    email: "swap@gmail.com",
    password: "abc123",
    location: "Boston, MA",
    username: "swap"
  ) }

  let!(:item1) { Item.create(
    title: "Monopoly",
    description: "A great board game for all",
    location: "Boston, MA",
    photo: "pic",
    category: "board games",
    user: user1
  ) }

  let!(:item2) { Item.create(
    title: "Yugioh",
    description: "All the cards",
    location: "Boston, MA",
    photo: "pic",
    category: "collectibles",
    user: user2
  ) }

  let!(:item3) { Item.create(
    title: "Connect 4",
    description: "A great board game for all",
    location: "Boston, MA",
    photo: "pic",
    category: "board games",
    user: user1
  ) }

  let!(:item4) { Item.create(
    title: "Dragonball",
    description: "All the cards",
    location: "Boston, MA",
    photo: "pic",
    category: "collectibles",
    user: user2
  ) }

  let!(:offer1) { Offer.create(
    status: "pending",
    offered_item: item3,
    traded_item: item4
  ) }

  let!(:comment1) { Comment.create(
    body: "Let's meet in Boston!",
    user: user1,
    offer: offer1
  ) }

  let!(:comment2) { Comment.create(
    body: "Sounds good!",
    user: user2,
    offer: offer1
  ) }

  describe "GET#index" do
    it "should return a list of all items that aren't in offer" do
      user = FactoryBot.create(:user)
      sign_in user
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["items"].length).to eq 2

      expect(returned_json["items"][1]["title"]).to eq "Monopoly"
      expect(returned_json["items"][1]["description"]).to eq "A great board game for all"
      expect(returned_json["items"][1]["location"]).to eq "Boston, MA"
      expect(returned_json["items"][1]["category"]).to eq "board games"
      expect(returned_json["items"][1]["photo"][0]).to eq nil

      expect(returned_json["items"][0]["title"]).to eq "Yugioh"
      expect(returned_json["items"][0]["description"]).to eq "All the cards"
      expect(returned_json["items"][0]["location"]).to eq "Boston, MA"
      expect(returned_json["items"][0]["category"]).to eq "collectibles"
      expect(returned_json["items"][0]["photo"][0]).to eq nil
    end
  end

  describe "GET/show" do
    it "should return the item" do
      get :show, params: {id: item3.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json["item"]["title"]).to eq "Connect 4"
      expect(returned_json["item"]["description"]).to eq "A great board game for all"
      expect(returned_json["item"]["location"]).to eq "Boston, MA"
      expect(returned_json["item"]["category"]).to eq "board games"
      expect(returned_json["item"]["photo"][0]).to eq nil
    end

    it "should return the item that has been offered" do
      get :show, params: {id: item3.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json["item"]["traded_item_info"]["title"]).to eq "Dragonball"
      expect(returned_json["item"]["traded_item_info"]["description"]).to eq "All the cards"
      expect(returned_json["item"]["traded_item_info"]["location"]).to eq "Boston, MA"
      expect(returned_json["item"]["traded_item_info"]["category"]).to eq "collectibles"
      expect(returned_json["item"]["traded_item_info"]["photo"][0]).to eq nil
    end

    it "should return all the comments with the current username" do
      get :show, params: {id: item3.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1

      expect(returned_json["item"]["comments"][0]["body"]).to eq "Let's meet in Boston!"
      expect(returned_json["item"]["user"]["username"]).to eq "john"
      expect(returned_json["item"]["comments"][1]["body"]).to eq "Sounds good!"
      expect(returned_json["item"]["trade_user"]["username"]).to eq "swap"
    end

    it "should return the offers status" do
      get :show, params: {id: item3.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1

      expect(returned_json["item"]["offer"]["status"]).to eq "pending"
    end
  end

  describe "POST#create" do
    it "should create a new item" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        title: "Catan",
        description: "A great board game for all",
        location: "Boston, MA",
        photo: "pic",
        category: "board games",
        user: user1
      }

      prev_count = Item.count
      post :create, params: post_json, format: :json
      expect(Item.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly added item" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        title: "Catan",
        description: "A great board game for all",
        location: "Boston, MA",
        photo: "pic",
        category: "board games",
        user: user1
      }

      post :create, params: post_json, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["item"]["title"]).to eq "Catan"
      expect(returned_json["item"]["description"]).to eq "A great board game for all"
      expect(returned_json["item"]["location"]).to eq "Boston, MA"
      expect(returned_json["item"]["photo"][0]).to eq nil
      expect(returned_json["item"]["category"]).to eq "board games"
    end
  end
end
