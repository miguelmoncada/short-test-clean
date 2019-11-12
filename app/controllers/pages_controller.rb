class PagesController < ApplicationController

  def home
  end

  def short_code
    @short_url = ShortUrl.find_by_short_code(params[:path])
    if @short_url
      redirect_to api_v1_short_url_url(id: params[:path])
    else
      redirect_to "/not-found"
    end
  end

end