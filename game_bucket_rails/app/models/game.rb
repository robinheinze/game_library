class Game < ActiveRecord::Base
  def self.search(search)
    search_condition = "%" + search + "%"
    Game.where('title LIKE ? OR description LIKE ?', search_condition, search_condition)
  end
end
