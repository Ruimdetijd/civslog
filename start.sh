#!/usr/bin/env bash 

npm run build
npm run dist
docker-compose -p civslog up -d --build
