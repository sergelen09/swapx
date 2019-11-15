require 'rails_helper'

RSpec.describe Offer, type: :model do
  it { should belong_to :offered_item }
  it { should belong_to :traded_item }
  it { should have_many :comments }

  it { should have_valid(:status).when("pending") }
  it { should_not have_valid(:status).when(nil, "") }
end
