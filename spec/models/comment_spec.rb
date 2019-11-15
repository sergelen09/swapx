require 'rails_helper'

RSpec.describe Comment, type: :model do
  it { should belong_to :offer }
  it { should belong_to :user }

  it { should have_valid(:body).when("Let's meet in Boston, MA") }
  it { should_not have_valid(:body).when(nil, "") }
end
