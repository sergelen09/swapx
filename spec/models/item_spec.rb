require 'rails_helper'

RSpec.describe Item, type: :model do
  it { should belong_to :user }

  it { should have_valid(:title).when("Monopoly") }
  it { should_not have_valid(:title).when(nil, "") }

  it { should have_valid(:description).when("A fun board game for all.") }
  it { should_not have_valid(:description).when(nil, "") }
end
