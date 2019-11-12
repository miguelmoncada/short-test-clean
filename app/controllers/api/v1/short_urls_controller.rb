class Api::V1::ShortUrlsController < ActionController::API

  include Response
  include ExceptionHandler

  before_action :set_short_url, only: %i[show]
  before_action :validate_link_status, only: %i[create]

  def index
    response = { urls: ShortUrl.most_frequently }
    json_response(response)
  end

  def create
    @short_url = ShortUrl.create!(url_params)
    response = { short_code: @short_url.short_code }
    json_response(response)
  end

  def show
    redirect_to(@short_url.full_url)
  end

  private

  def url_params
    params.permit(:full_url)
  end

  def set_short_url
    @short_url = ShortUrl.find_by_short_code!(params[:id])
    @short_url.update({click_count: @short_url.click_count + 1 })
  end

  def validate_link_status
    open(params[:full_url])
  end

end
