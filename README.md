# Intial Setup

    docker-compose build
    docker-compose run short-app rails db:setup && rails db:migrate

# To run the specs

    docker-compose -f docker-compose-test.yml run short-app-rspec

# To run migrations

    docker-compose run short-app rails db:migrate
    docker-compose -f docker-compose-test.yml run short-app-rspec rails db:test:prepare

# Run the web server

    docker-compose up

# Adding a URL

    curl -X POST -d "full_url=https://google.com" http://localhost:3000/short_urls.json

# Getting the top 100

    curl -X GET http://localhost:3000/short_urls.json

# Checking your short URL redirect

    curl -I http://localhost:3000/short_urls/1
    

Short code generator for Url

Basically, I'm taking the ShortUrl ID and converting it, from Base10 to Base62, and using it as short_code.

Note: This line generates a connection error, but apparently it creates the database, my development environment set up is: 
Ubuntu 18.04 LTS, Docker 19.03.4 and Docker Compose 1.24.1   
line => docker-compose run short-app rails db:setup && rails db:migrate
