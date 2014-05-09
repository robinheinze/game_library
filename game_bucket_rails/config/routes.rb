GameBucketRails::Application.routes.draw do
  resources :games, :except => [:new, :edit]
  resources :searches, :except => [:new, :edit]
  resources :results, :only => [:index]
end
