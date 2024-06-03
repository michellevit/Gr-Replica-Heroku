# app/controllers/api/links_controller.rb

module Api
  class LinksController < BaseController
    skip_before_action :verify_authenticity_token
    before_action :set_link, only: [:show, :update, :destroy, :process_payment]
    before_action :authenticate_user!, only: [:create, :update, :destroy]

    def index
      @links = Link.all
      render json: @links.as_json(methods: :formatted_price)
    end

    def show
      render json: @link.as_json(methods: :formatted_price)
      Rails.logger.info("Link: }")
    end

    def create
      @link = current_user.links.new(link_params.merge(owner: current_user.email)) 
      if @link.save
        handle_file_upload(params[:file], @link) if params[:file].present?
        handle_preview_file_upload(params[:preview_file], @link) if params[:preview_file].present?
        render json: @link, status: :created
      else
        Rails.logger.error("Link creation failed: #{@link.errors.full_messages.join(', ')}")
        render json: @link.errors, status: :unprocessable_entity
      end
    end

    def update
      if @link.update(link_params)
        handle_file_upload(params[:file], @link) if params[:file].present?
        handle_preview_file_upload(params[:preview_file], @link) if params[:preview_file].present?
        render json: @link
      else
        render json: @link.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @link.destroy
        head :no_content
      else
        render json: @link.errors, status: :unprocessable_entity
      end
    end
    
    def process_payment
      # Implement Stripe payment processing here
    end

    private

    def set_link
      @link = Link.find_by(unique_permalink: params[:id])
    end

    def link_params
      params.require(:link).permit(:name, :price, :url, :preview_url, :description, :download_limit)
    end

    def handle_file_upload(file, link)
      link.file.attach(file)
    end

    def handle_preview_file_upload(file, link)
      link.preview_file.attach(file)
    end
  end
end
