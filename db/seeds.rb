# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(
  email: "danny@test.com", password: "abc123", password_confirmation: "abc123", location: "Boston, MA", username: "danny"
)

user2 = User.create(
  email: "john@test.com", password: "abc123", password_confirmation: "abc123", location: "Chelsea, MA", username: "john"
)

item1 = Item.create(title: "Playstation 4!!", description: "Brand new only 5 months old! Will deliver to you.", location: "Marlborough, MA", photo: {
"url": "https://swapxbucket.s3.amazonaws.com/uploads/item/photo/40/ps4.jpg"
}, user: User.first)
item2 = Item.create(title: "Yugioh", description: "All the cards", location: "Weymouth, MA", photo: "pic", user: User.second)
item3 = Item.create(title: "Lord of the Rings", description: "All the book", location: "Cambridge, MA", photo: "pic", user: User.third)
item4 = Item.create(title: "Pokemon Cards", description: "All the card", location: "Amesbury, MA", photo: "pic", user: User.fourth)

offer1 = Offer.create(offered_item: Item.first, traded_item: Item.second, status: "in offer")
offer2 = Offer.create(offered_item: Item.third, traded_item: Item.fourth, status: "in offer")
