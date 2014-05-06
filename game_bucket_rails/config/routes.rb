GameBucketRails::Application.routes.draw do
  resources :games, :except => [:new, :edit]
end
