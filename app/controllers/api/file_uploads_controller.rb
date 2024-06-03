# app/controllers/api/fil_uploads_controller.rb


class Api::FileUploadsController < BaseController
  skip_before_action :verify_authenticity_token

  def create
    file = params[:file]
    if file
      uploaded_file = ActiveStorage::Blob.create_and_upload!(
        io: file.tempfile,
        filename: file.original_filename,
        content_type: file.content_type
      )
      render json: { url: url_for(uploaded_file) }, status: :ok
    else
      render json: { error: 'No file uploaded' }, status: :unprocessable_entity
    end
  end
end
