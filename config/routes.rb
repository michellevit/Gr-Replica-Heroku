Rails.application.routes.draw do
  root 'application#react_app'
  get "up" => "rails/health#show", as: :rails_health_check
  post 'signup', to: 'users#create'
  get '*path', to: 'application#react_app'
end
