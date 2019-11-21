require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:user1) { User.create(
    email: "john@gmail.com",
    password: "john123",
    location: "Boston, MA",
    username: "john"
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
    user: user1
  ) }

  let!(:offer1) { Offer.create(
    status: "pending",
    offered_item: item1,
    traded_item: item2
  ) }

  describe "GET#index" do
    it "should return a list of all items" do
      user = FactoryBot.create(:user)
      sign_in user
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["items"].length).to eq 2

      expect(returned_json["items"][0]["title"]).to eq "Monopoly"
      expect(returned_json["items"][0]["description"]).to eq "A great board game for all"
      expect(returned_json["items"][0]["location"]).to eq "Boston, MA"
      expect(returned_json["items"][0]["category"]).to eq "board games"
      expect(returned_json["items"][0]["photo"][0]).to eq nil

      expect(returned_json["items"][1]["title"]).to eq "Yugioh"
      expect(returned_json["items"][1]["description"]).to eq "All the cards"
      expect(returned_json["items"][1]["location"]).to eq "Boston, MA"
      expect(returned_json["items"][1]["category"]).to eq "collectibles"
      expect(returned_json["items"][1]["photo"][0]).to eq nil
    end

    it "should return a list of all items near the user" do
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["items"].length).to eq 2

      expect(returned_json["items"][0]["title"]).to eq "Monopoly"
      expect(returned_json["items"][0]["description"]).to eq "A great board game for all"
      expect(returned_json["items"][0]["location"]).to eq "Boston, MA"
      expect(returned_json["items"][0]["category"]).to eq "board games"
      expect(returned_json["items"][0]["photo"][0]).to eq nil

      expect(returned_json["items"][1]["title"]).to eq "Yugioh"
      expect(returned_json["items"][1]["description"]).to eq "All the cards"
      expect(returned_json["items"][1]["location"]).to eq "Boston, MA"
      expect(returned_json["items"][1]["category"]).to eq "collectibles"
      expect(returned_json["items"][1]["photo"][0]).to eq nil
    end

    it "should return false if no user is signed in" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(returned_json["user"]).to eq false
    end

    it "should return all offers" do
      user = FactoryBot.create(:user)
      sign_in user
      get :index
      returned_json = JSON.parse(response.body)

      expect(returned_json["offers"].length).to eq 1
    end

    it "should return no items near if a user is not signed in" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(returned_json["items_near"]).to eq []
    end
  end
end
