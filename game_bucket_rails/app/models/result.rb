class Result < ActiveRecord::Base
  belongs_to :game
  belongs_to :search
end
