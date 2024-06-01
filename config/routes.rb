Rails.application.routes.draw do
  root 'application#react_app'
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    post 'signup', to: 'users#create'
    get 'check_logged_in', to: 'sessions#check_logged_in'
  end

  get '*path', to: 'application#react_app'
end