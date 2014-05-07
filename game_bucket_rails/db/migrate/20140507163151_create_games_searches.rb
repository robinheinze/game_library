class CreateGamesSearches < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.string :keyword

      t.timestamps
    end
    create_table :games_searches do |t|
      t.belongs_to :game
      t.belongs_to :search
    end
  end
end
