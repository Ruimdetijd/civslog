#!/usr/bin/env bash


NODE_ENV=development npm run build
NODE_ENV=development docker-compose -p civslog -f docker-compose-dev.yml up --build
