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
