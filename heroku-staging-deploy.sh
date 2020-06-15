#!/bin/sh

PROJECT_NAME="geocart-plataforma-stg"

echo "\nStarting deploy to staging!"
echo "Press CTRL+C at any moment to stop the process."
echo "\nFirst, login into your Heroku account or press q to ignore if you're already logged."
echo

heroku login
heroku container:login
echo

docker build -t registry.heroku.com/$PROJECT_NAME/web -f docker/production/Dockerfile .
docker push registry.heroku.com/$PROJECT_NAME/web
heroku container:release web -a $PROJECT_NAME

echo "\n\nProcess finished!"
echo "Developed by Ecostage"
