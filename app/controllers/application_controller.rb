class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler
  require 'open-uri'
end
