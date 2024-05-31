class ApplicationController < ActionController::Base
  
    def react_app
        render file: Rails.root.join('public', 'index.html'), layout: false, content_type: 'text/html'
    end
  
end