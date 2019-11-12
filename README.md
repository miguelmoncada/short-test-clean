# Intial Setup

    docker-compose build
    # Before to run next line, make shure you have node_module folder in /app
    docker-compose run short-app rails webpacker:install
    docker-compose run short-app rails webpacker:install:react
    docker-compose run short-app rails generate react:install 
    docker-compose run short-app yarn add react-mdl react-router-dom react-bootstrap bootstrap notiflix-react    
    
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
    

# Short code generator for Url

Basically, I'm taking the ShortUrl ID and converting it, from Base10 to Base62, and using it as short_code.

Note: This line generates a connection error, but apparently it creates the database, my development environment set up is: 
Ubuntu 18.04 LTS, Docker 19.03.4 and Docker Compose 1.24.1   
line => docker-compose run short-app rails db:setup && rails db:migrate

# React Web Client

I decided to use 'react-rails' gem, to create a React Web Client.
https://github.com/reactjs/react-rails

# Web client Routes: 

    ROUTES:
    
    Index:                  http://localhost:3000/
    
    Add New Url:            http://localhost:3000/new-url
    
    Show URL by Short Code: http://localhost:3000/short-code/"short_code"

- The index view will show you the top 100 most frequently URLs. This view is updated through a background process
wich is executed every time when a URL is created or updated.

- For each URL there are two buttons, the first one will open the link in a new tab, and the other one will show you more 
info about the new url with the short code.

- Also, you can check your short code in this route: http://localhost:3000/short-code/"short_code"

- To add anew URL, go to: http://localhost:3000/new-url
