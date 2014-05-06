GameBucketRails::Application.routes.draw do
  resources :games, :except => [:new, :edit]
  match '/games/search/:search', {:to => 'games#search', :via => 'get'}
end
