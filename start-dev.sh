#!/usr/bin/env bash

npm run build
docker-compose -p civslog -f docker-compose-dev.yml up --build
