Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/items', to: "static_pages#index"
  get '/items/new', to: "static_pages#new"
  get '/items/:id', to: "static_pages#index"

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :items, only: [:index, :create, :show]
      resources :offers, only: [:create, :index]
      resources :comments, only: [:create]
    end
  end
end
