class ShortUrl < ApplicationRecord

  require 'open-uri'
  include ModuleEncode

  validates    :full_url, presence: true, allow_blank: false, allow_nil: false
  validate     :validate_full_url
  after_create :set_short_code, :update_title! , :UpdateUrlsListChannel
  after_update :UpdateUrlsListChannel

  def validate_full_url
    validates_format_of :full_url, with: /(^$)|(^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$)/ix
  end

  def set_short_code
    self.update({short_code: encode_to_base(self.id)})
  end

  def update_title!
    UpdateTitleJob.perform_later(self.id)
  end

  def UpdateUrlsListChannel
    UpdateUrlsListChannelJob.perform_later()
  end

  scope :most_frequently, -> (amount = 100) { order('click_count DESC').first(amount).as_json(except: [:id, :created_at , :updated_at]) }

end
