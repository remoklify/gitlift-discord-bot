#!/usr/bin/env bash

if [ ! -f .env ]; then
  echo "Generating .env file.."
  touch .env
  {
    echo "PORT=6782"

    echo "CLIENT_TOKEN={Discord Client Token}"
    echo "GITLIFT_BL_SERVER_URL={Gitlift Business Logic Server Url}"
  } >>.env
else
  echo ".env file already exists. Nothing to do..."
fi
