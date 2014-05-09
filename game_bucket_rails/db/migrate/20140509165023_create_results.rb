class CreateResults < ActiveRecord::Migration
  def change
    drop_table :games_searches
    create_table :results do |t|
      t.integer :game_id
      t.integer :search_id
      t.timestamps
    end
  end
end
