# app/controllers/api/links_controller.rb

require 'stripe'

module Api
  class LinksController < BaseController
    skip_before_action :verify_authenticity_token
    before_action :set_link, only: [:show, :update, :destroy, :details, :purchase]
    before_action :authenticate_user!, only: [:create, :update, :destroy]

    def index
      @links = Link.all
      render json: @links.as_json(methods: :formatted_price)
    end

    def show
      render json: @link.as_json(methods: :formatted_price)
    end

    def create
      @link = current_user.links.new(link_params.merge(owner: current_user.email))
      if @link.save
        attach_files_to_link(@link)
        render json: @link, status: :created
      else
        render json: @link.errors, status: :unprocessable_entity
      end
    end

    def update
      if @link.update(link_params)
        attach_files_to_link(@link)
        render json: @link
      else
        render json: @link.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @link.destroy
      head :no_content
    end

    def details
      logger.info "Fetching details for link with permalink: #{params[:id]}"
      render json: @link.as_json(methods: :formatted_price)
    end

    def purchase
      begin
        # Create a Stripe customer
        customer = Stripe::Customer.create(
          email: params[:stripeEmail],
          payment_method: params[:stripeToken]
        )
    
        # Create a PaymentIntent
        intent = Stripe::PaymentIntent.create(
          customer: customer.id,
          amount: (@link.price * 100).to_i,
          description: @link.name,
          currency: 'usd',
          payment_method: params[:stripeToken],
          confirm: true,
          return_url: "#{request.base_url}/success"
        )
    
        @link.increment!(:number_of_downloads)
    
        if intent.next_action
          redirect_url = intent.next_action.redirect_to_url.url
        else
          product_url = Rails.application.routes.url_helpers.rails_blob_url(@link.file, host: request.base_url)
          redirect_url = "#{request.base_url}/success?product_url=#{CGI.escape(product_url)}"
        end
    
        render json: { success: true, redirect_url: redirect_url }
      rescue Stripe::CardError => e
        render json: { success: false, error_message: e.message }
      rescue Stripe::InvalidRequestError => e
        render json: { success: false, error_message: e.message }
      end
    end
    
    

    private

    def set_link
      @link = Link.find_by(unique_permalink: params[:id])
    end

    def link_params
      params.require(:link).permit(:name, :price, :url, :preview_url, :description, :download_limit)
    end

    def attach_files_to_link(link)
      link.file.attach(params[:file]) if params[:file].present?
      link.preview_file.attach(params[:preview_file]) if params[:preview_file].present?
    end
  end
end
