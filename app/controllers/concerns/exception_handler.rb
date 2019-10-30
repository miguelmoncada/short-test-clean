module ExceptionHandler
  extend ActiveSupport::Concern

  included do
    #Define custom handlers
    rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from SocketError, with: :not_valid_url
    rescue_from Errno::ENOENT, with: :not_valid_url

  end

  private

  # JSON response with message; Status code 422 - unprocessable entity
  def four_twenty_two(e)
    json_response({ message: e.message }, :unprocessable_entity)
  end

  # JSON response with message; Status code 401 - Unauthorized
  def unauthorized_request(e)
    json_response({ message: e.message }, :unauthorized)
  end

  # JSON response with message; Status code 404 - Not Found
  def not_found(e)
    json_response({ message: e.message }, :not_found)
  end

  # CUSTOM response for invalid url
  def not_valid_url()
    json_response({ errors: 'Validation failed: Full url is not a valid url'}, :not_found)
  end
end