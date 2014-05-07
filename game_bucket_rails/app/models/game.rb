class Game < ActiveRecord::Base
  has_and_belongs_to_many :searches

  def self.search(search)
    search_condition = "%" + search + "%"
    Game.where('title LIKE ? OR description LIKE ?', search_condition, search_condition)
  end
end
