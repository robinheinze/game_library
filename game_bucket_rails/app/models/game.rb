class Game < ActiveRecord::Base
  has_many :results
  has_many :searches, :through => :results

  def self.search(search)
    search_condition = "%" + search + "%"
    Game.where('title LIKE ? OR description LIKE ?', search_condition, search_condition)
  end
end
