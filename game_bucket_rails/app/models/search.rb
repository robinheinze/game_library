class Search < ActiveRecord::Base
  has_many :results
  has_many :games, :through => :results

  def get_results
    matches = Game.search(self.keyword)
    matches.each do |match|
      Result.create(:game_id => match.id, :search_id => self.id)
    end
    self.games
  end

end
