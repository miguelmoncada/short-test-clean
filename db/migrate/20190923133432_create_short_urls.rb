class CreateShortUrls < ActiveRecord::Migration[6.0]
  def change
    create_table :short_urls do |t|
      t.string  :title
      t.string  :full_url
      t.string  :short_code, index: true, unique: true
      t.integer :click_count, default: 0
      t.timestamps
    end
  end
end