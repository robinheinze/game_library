require 'spec_helper'

describe Search do
  it { should have_and_belong_to_many :games }
  it 'can return the correct search results given a keyword' do
    test_game = Game.create(:title => 'stuff')
    test_search = Search.create(:keyword => 'stuf')
    test_search.get_results.should eq [test_game]
  end

  it 'knows the games in its results' do
    test_game = Game.create(:title => 'stuff')
    test_search = Search.create(:keyword => 'stuf')
    test_search.get_results
    test_search.games.should eq [test_game]
  end

end
