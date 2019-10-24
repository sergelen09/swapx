Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  namespace :api do
    namespace :v1 do

    end
  end
end
