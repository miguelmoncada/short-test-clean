require 'active_support/concern'
module ModuleEncode
  extend ActiveSupport::Concern

  CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  def encode_to_base(num, base = 62)
    return CHARACTERS[0] if num == 0
    result = ""
    while num > 0
      residue = num % base
      result.prepend(CHARACTERS[residue])
      num = (num / base).floor
    end
    result
  end

end