require 'rails_helper'

RSpec.describe Api::V1::ShortUrlsController, type: :controller do

  let(:parsed_response) { JSON.parse(response.body) }

  describe "index" do
    # The URL https://wwww.test.rspec/ is no longer working
    let!(:short_url) { ShortUrl.create(full_url: "https://rspec.info/") }
    let(:public_attributes) do
      {
        "title"       => short_url.title,
        "full_url"    => short_url.full_url,
        "short_code"  => short_url.short_code,
        "click_count" => short_url.click_count
      }
    end

    it "is a successful response" do
      get :index, format: :json
      expect(response.status).to eq 200
    end

    it "has a list of the top 100 urls" do
      get :index, format: :json

      expect(parsed_response['urls']).to be_include(public_attributes)
    end

  end

  describe "create" do

    it "creates a short_url" do
      post :create, params: { full_url: "https://rspec.info/" }, format: :json
      expect(parsed_response['short_code']).to be_a(String)
    end

    it "does not create a short_url" do
      post :create, params: { full_url: "nope!" }, format: :json
      expect(parsed_response['error']).to be_include("Validation failed: Full url is not a valid url")
    end

  end

  describe "show" do

    let!(:short_url) { ShortUrl.create!(full_url: "https://rspec.info/") }

    it "redirects to the full_url" do
      get :show, params: { id: short_url.short_code }, format: :json
      expect(response).to redirect_to(short_url.full_url)
    end

    it "does not redirect to the full_url" do
      get :show, params: { id: "nope" }, format: :json
      expect(response.status).to eq(404)
    end

    it "increments the click_count for the url" do
      expect { get :show, params: { id: short_url.short_code }, format: :json }.to change { ShortUrl.find(short_url.id).click_count }.by(1)
    end

  end

end
