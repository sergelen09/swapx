require "rails_helper"

RSpec.describe Api::V1::ItemsController, type: :controller do
  let!(:user1) { User.create(
    email: "john@gmail.com",
    password: "john123"
  ) }
  let!(:item1) { Item.create(
    title: "Monopoly",
    description: "A great board game for all",
    user: user1
  ) }
  let!(:item2) { Item.create(
    title: "Yugioh",
    description: "All the cards",
    user: user1
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

      expect(returned_json["items"][1]["title"]).to eq "Yugioh"
      expect(returned_json["items"][1]["description"]).to eq "All the cards"
    end
  end
end
