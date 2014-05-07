require 'spec_helper'

describe Game do
  it { should have_and_belong_to_many :searches }
  it 'can search by title' do
    test_game = Game.create(:title => 'stuff')
    Game.search('stuf').should eq [test_game]
  end

  it 'can search by description' do
    test_game = Game.create(:title => 'stuff', :description => 'more stuff and even more stuff')
    Game.search('mor').should eq [test_game]
  end

  it 'knows which searches have come up with it as a result' do
    test_game = Game.create(:title => 'stuff')
    test_search = Search.create(:keyword => 'stuf')
    test_search.get_results
    test_game.searches.should eq [test_search]
  end
end
