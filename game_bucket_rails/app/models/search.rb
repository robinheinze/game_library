class Search < ActiveRecord::Base
  has_and_belongs_to_many :games

  def get_results
    results = Game.search(self.keyword)
    results.each do |result|
      self.games << result
    end
    self.games
  end

end
