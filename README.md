# Boilerplate Code for Rails-React-PostgreSQL-Heroku App

![Ruby Version](https://img.shields.io/badge/Ruby-3.2.3-cc0000.svg)
![Rails Version](https://img.shields.io/badge/Rails-7.1.3-cc0000.svg)
![React Version](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)
![Heroku](https://img.shields.io/badge/Platform-Heroku-6762a6.svg)

Boilerplate code for setting up a Rails-React-PostgreSQL application on Heroku.


## Table of Contents
- [Prerequisites](#prerequisites)
- [How To Set Up Project](#how-to-set-up-project) 
- [How To Set Up Database](#how-to-set-up-db) 
- [Useful Heroku Commands](#heroku-commands)


## Prerequisites<a name="prerequisites"></a>
- A GitHub account
- Git installed on your computer
- A Heroku account
- Optional: Heroku CLI installed on your computer (if using database, and also makes debugging easier)

## How To Set Up Project<a name="how-to-set-up-project"></a>
- Create your new repository from the Template (aka this repository)
  - Click the 'Use this template' green button at the top right of this page
  - Select 'Create a new repository' 
    - Provide a name, description, and set it to public or private
    - Click 'Create repository' 
- Set up your project locally
  - After creating your repository from the template, you need to set it up on your local machine for development
  - Open a terminal on your computer
  - Navigate into the folder you would like your project to reside in
    - e.g. `cd ~/Projects`
  - Clone the repository
    - `git clone https://github.com/USERNAME/REPOSITORY_NAME.git`
    - Note: replace USERNAME and REPOSITORY_NAME with your actual GitHub username and the name of the new repository you just created (NOT the boilerplate template)
  - Navigate into the project directory
    - `cd REPOSITORY_NAME`
  -Check the remote setup to verify that the repository URL has been set correctly
    - `git remote -v`
  - Now you can start making changes to the project:
    - To add changes: `git add .`
    - To commit change: `git commit -m "Your message"`
    - To push changes to GitHub: `git push origin main`
- Create an account with Heroku
  - Create a new app for your project
  - Set up the app
    - Resources Tab: 
      - In the Add-ons section search ‘Heroku Postgres’ + submit order form to add it
    - Deploy Tab:
      - In the Deployment method section, select GitHub (connect to GitHub)
      - Connect to your GitHub and search for the repo you created and connect it
      -	Click the button ‘Enable Automatic Deploys’
      - Note: now whenever you push a change to your GitHub repository, Heroku will deploy a new version of your app
    - Settings Tab: 
      - In the Buildpack section: 
        - Add buildpack: nodejs
        - Add buildpack: ruby
        - Note: nodejs buildpack must be before ruby!
    - Configure SSL:
      - Select ‘Automatic Certificate Management’ and click next
    - Optional: set a custom domain:
      - Click add domain, enter the domain name, click next
      - If the domain is a Root domain: ALIAS
      - If the domain is a non-root domain: CNAME
- Optional/Considerations:
  - Change favicon: reactapp/public/favicon
  - Change website title: reactapp/public/index.html
  - Add namespace for controllers: ‘api’
  - Download the Heroku CLI (see useful Heroku commands)


## How To Set Up Database<a name="how-to-set-up-db"></a>
- Already done:   
  - In the previous step the PostgreSQL add-on should have been added :
    - In the Heroku app's Resources Tab:
      - In the Add-ons section search ‘Heroku Postgres’ + submit order form to add it
  - The 'pg' gem has already been added to the Gemfile
  - The config/database.yml file uses the DATABASE_URL env var provided by Heroku
- Make sure the Heroku CLI is downloaded
- Initialize the database:
  - In the terminal run:
    - `heroku run rails db:create --app your-app-name`
    - `heroku run rails db:migrate --app your-app-name`
    - `git add .`
    - `git commit -m 'initialize db'`
    - `git push origin main` 
- Now that the database has been created, set up the tables
  - Add a .env file to the project with the following var: 
    - CORS_ORIGINS=http://localhost:3000
    - Add '.env' to the .gitignore file
  - Add the dotenv gem to the Gemfile: 
    - Add this line: `gem 'dotenv-rails', groups: [:development, :test]`
    - In the temrinal run `bundle install`
    - Add this line to the top of the `config/application.rb' file:
      - `require 'dotenv/load'`
  - Start the rails server
    - Run `rails server`
    - Create a table migration file: 
      - Run: `rails generate migration Create[YOURTABLENAMEHERE]`
    - Go to the folder db/migrate and find the newly created file
      - Example: 
      ```ruby
      class CreateProducts < ActiveRecord::Migration[7.1]
        def change
          create_table :products do |t|
            t.string :name

            t.timestamps
          end
        end
      end
      `````
  - Commit the code to GitHub
    - `git add .`
    - `git commit -m "Add new table migration`
    - `git push origin main`
  - Run the following comand to migrate the database on Heroku: 
    - `heroku run rails db:migrate --app your-app-name`



## Useful Heroku Commands <a name="heroku-commands"></a>
- Login: `heroku login`
- View Error Logs: `heroku logs -a [your app name]`
- Restart App: `heroku restart -a [your app name]`
- Migrate DB changes: `heroku run rails db:migrate -a [your app name]`
- Run the rails console: `heroku run rails console -a [your app name]`
- Seed the db: `heroku run rails db:seed -a [your app name]`

