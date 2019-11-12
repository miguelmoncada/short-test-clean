class UrlsListChannel < ApplicationCable::Channel
  def subscribed
    stream_from "urls_list_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
