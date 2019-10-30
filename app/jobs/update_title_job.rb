class UpdateTitleJob < ApplicationJob
  @queue = :default
  def perform(short_url_id)
    @short_url = ShortUrl.find(short_url_id)
    @short_url.title = Nokogiri::HTML.parse(open(@short_url.full_url)).title
    @short_url.save
  end
end
