module Api
  class LinksController < ApplicationController
    before_action :authenticate_user!, except: [:show, :index]
    before_action :set_link, only: [:show, :update, :destroy, :process_payment]

    def index
      @links = current_user.links
      render json: @links
    end

    def show
      render json: @link
    end

    def create
      @link = current_user.links.new(link_params)
      if @link.save
        handle_file_upload(params[:file], @link) if params[:file].present?
        handle_preview_file_upload(params[:preview_file], @link) if params[:preview_file].present?
        render json: @link, status: :created
      else
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
      @link = current_user.links.find_by(unique_permalink: params[:id])
    end

    def link_params
      params.require(:link).permit(:name, :price, :url, :preview_url, :description)
    end

    def handle_file_upload(file, link)
      link.file.attach(file)
    end

    def handle_preview_file_upload(file, link)
      link.preview_file.attach(file)
    end
  end
end
