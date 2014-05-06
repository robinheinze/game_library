class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :title
      t.text :description
      t.string :image
      t.integer :year
      t.string :console
      t.string :company
      t.boolean :inProgress

      t.timestamps

    end
  end
end
