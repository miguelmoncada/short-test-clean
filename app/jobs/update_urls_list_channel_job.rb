class UpdateUrlsListChannelJob < ApplicationJob
  @queue = :default
  def perform()
    ActionCable.server.broadcast 'urls_list_channel' , { urls: ShortUrl.most_frequently }
  end
end
