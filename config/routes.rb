Rails.application.routes.draw do
  root 'application#react_app'
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :links
    post 'upload', to: 'file_uploads#create'
    post 'signup', to: 'users#create'
    post 'login', to: 'sessions#create'
    get 'check_logged_in', to: 'sessions#check_logged_in'
    post 'forgot_password', to: 'passwords#forgot'
    post 'reset_password', to: 'passwords#reset'
    delete 'logout', to: 'sessions#logout'
    put 'update_user', to: 'users#update'
  end


  get '*path', to: 'application#react_app'
end
