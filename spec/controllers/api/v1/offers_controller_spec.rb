require "rails_helper"

RSpec.describe Api::V1::OffersController, type: :controller do
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
    offered_item: item1,
    traded_item: item2
  ) }

  describe "GET#index" do
    it "should return a list of all items that user owns but have not been offered yet" do
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["items"].length).to eq 1

      expect(returned_json["items"][0]["title"]).to eq "Connect 4"
    end
  end

  describe "POST#create" do
    it "should create a new offer" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        offeredItem: item3,
        selectedItem: item4
      }

      prev_count = Offer.count
      post :create, params: post_json, format: :json
      expect(Offer.count).to eq(prev_count + 1)
    end

    it "returns the json of the new offer" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        offeredItem: item3,
        selectedItem: item4
      }

      post :create, params: post_json, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["offer"]["status"]).to eq "pending"
    end

    it "returns the json of the new traded item" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        offeredItem: item3,
        selectedItem: item4
      }

      post :create, params: post_json, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["item"]["title"]).to eq "Dragonball"
      expect(returned_json["item"]["description"]).to eq "All the cards"
      expect(returned_json["item"]["location"]).to eq "Boston, MA"
      expect(returned_json["item"]["category"]).to eq "collectibles"
      expect(returned_json["item"]["photo"][0]).to eq nil
    end
  end

  describe "PUT#update" do
    it "should update the offer to accepted" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        offer: offer1,
        id: offer1.id
      }

      put :update, params: post_json, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["offer"]).to eq "accepted"
    end
  end

  describe "DELETE#destroy" do
    it "should update the offer to accepted" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        id: offer1.id,
        offer: offer1,
        item: { id: item1 }
      }

      delete :destroy, params: post_json, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["item"]["title"]).to eq "Monopoly"
    end
  end
end
