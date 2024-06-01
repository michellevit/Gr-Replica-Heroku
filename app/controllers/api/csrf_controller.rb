module Api
    class CsrfController < BaseController
        def index
        render json: { csrf_token: form_authenticity_token }
        end
    end
end