require 'spec_helper'

describe Game do
  it 'can search by title' do
    test_game = Game.create(:title => 'stuff')
    Game.search('stuf').should eq [test_game]
  end

  it 'can search by description' do
    test_game = Game.create(:title => 'stuff', :description => 'more stuff and even more stuff')
    Game.search('mor').should eq [test_game]
  end
end
