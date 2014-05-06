class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image, :year, :console, :company, :inProgress
end
