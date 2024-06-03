# config/routes.rb
Rails.application.routes.draw do
  root 'application#react_app'
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :links, only: [:index, :show, :create, :update, :destroy] do
      member do
        get 'details'
        post 'purchase'
      end
      collection do
        get 'homechart'
      end
    end
    
    post 'upload', to: 'file_uploads#create'
    post 'signup', to: 'users#create'
    post 'login', to: 'sessions#create'
    get 'check_logged_in', to: 'sessions#check_logged_in'
    post 'forgot_password', to: 'passwords#forgot'
    post 'reset_password', to: 'passwords#reset'
    delete 'logout', to: 'sessions#logout'
    put 'update_user', to: 'users#update'
  end
  
  # Active Storage routes
  direct :rails_blob do |blob|
    route_for(:rails_service_blob, blob.signed_id, blob.filename.to_s, only_path: true)
  end

  direct :rails_blob_representation do |representation|
    route_for(:rails_blob_representation, representation.blob.signed_id, representation.variation.key, representation.blob.filename.to_s, only_path: true)
  end

  direct :rails_disk_service do |file|
    route_for(:rails_disk_service, file.signed_id, file.filename, only_path: true)
  end

  direct :rails_blob_proxy do |blob|
    route_for(:rails_service_blob_proxy, blob.signed_id, blob.filename.to_s, only_path: true)
  end

  direct :rails_blob_representation_proxy do |representation|
    route_for(:rails_blob_representation_proxy, representation.blob.signed_id, representation.variation.key, representation.blob.filename.to_s, only_path: true)
  end

  # Ensure this is the last route to catch all unmatched routes
  get '*path', to: 'application#react_app', constraints: ->(req) { !req.path.start_with?('/rails/active_storage') }
end
