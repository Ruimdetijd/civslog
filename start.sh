#!/usr/bin/env bash 

NODE_ENV=production npm run build
NODE_ENV=production npm run dist
NODE_ENV=production docker-compose -p civslog up -d --build