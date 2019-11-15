require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many :items }
  it { should have_many :comments }

  it { should have_valid(:username).when("Danny") }
  it { should_not have_valid(:username).when(nil, "") }

  it { should have_valid(:location).when("Boston, MA") }
  it { should_not have_valid(:location).when(nil, "") }
end
