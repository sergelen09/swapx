require "rails_helper"

RSpec.describe Api::V1::CommentsController, type: :controller do
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

  let!(:offer1) { Offer.create(
    status: "pending",
    offered_item: item1,
    traded_item: item2
  ) }

  describe "POST#create" do
    it "should create a new comment" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        body: "Let's meet in Boston!",
        offerId: offer1.id,
        user: user1
      }

      prev_count = Comment.count
      post :create, params: post_json, format: :json
      expect(Comment.count).to eq(prev_count + 1)
    end

    it "returns the json of the new comment" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        body: "Let's meet in Boston!",
        offerId: offer1.id,
        user: user1
      }

      post :create, params: post_json, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["body"]).to eq "Let's meet in Boston!"
    end
  end
end
