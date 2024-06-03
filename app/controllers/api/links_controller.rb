module Api
  class LinksController < BaseController
    skip_before_action :verify_authenticity_token
    before_action :set_link, only: [:show, :update, :destroy, :process_payment]

    def index
      @links = Link.all
      render json: @links
    end

    def show
      render json: @link
    end

    def create
      @link = Link.new(link_params)
      Rails.logger.info("Link params: #{link_params.inspect}")
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
      @link.destroy
      head :no_content
    end

    def process_payment
      # Implement Stripe payment processing here
    end

    private

    def set_link
      @link = Link.find_by(unique_permalink: params[:id])
    end

    def link_params
      params.require(:link).permit(:name, :price, :url, :preview_url, :description, :download_limit, :user_id)
    end

    def handle_file_upload(file, link)
      link.file.attach(file)
      link.update(url: Rails.application.routes.url_helpers.rails_blob_url(link.file, only_path: true))
    end
    
    def handle_preview_file_upload(file, link)
      link.preview_file.attach(file)
      link.update(preview_url: Rails.application.routes.url_helpers.rails_blob_url(link.preview_file, only_path: true))
    end
  end
end
