# Geoespacialização de barragens

Projeto para acompanhamento geoespacial de barragens inicialmente do Brasil

#### Pre-requirements

*Make Sure you have `Docker` and `Docker Compose` installed!*

#### Installation

In order to get up and running with this project it is pretty simple, you just have to:

  - `git clone` this repository into your local machine
  - `cd` into root folder where you have cloned it
  - run `docker-compose build` to build the images into your machine
  - run `docker-compose up` to start those built images

At this moment you have the containers running, you now just have to install ruby and javascript dependencies as follow:

  - Open a new tab or window in your terminal, console or multiplexer
  - Run `docker-compose run --rm rails bundle install` to install ruby gems
  - Run `docker-compose run --rm rails rails db:setup` to load the database
  - Run `docker-compose run --rm node npm install` to install javascript dependencies, this might take a while, don't worry

#### That's it!
##### You should now be able to access `http://localhost:8003` and see it running!

#### Deploy (staging)

  Of course, for this you need to be able to push into Heroku registry, someone with access must allow your account.

  Step by step:

  - Open your terminal again in your root folder
  - Run `heroku login` this will open a new tab in your browser, do the auth step
  - Run `heroku container:login`
  - Run `docker build -t registry.heroku.com/geocart-staging/web -f docker/production/Dockerfile .` to build the images with the accordingly tag
  - Run `docker push registry.heroku.com/geocart-staging/web` to push this fresh built image into heroku registry
  - Finally, release this new version: `heroku container:release web -a geocart-staging`
  - Be aware that sometimes it causes the running version to be unstable, I like to restart all dynos after the release to make sure everything is all right


#### Do not forget to update this README if you changed the project, it will help the next as it just helped you!
