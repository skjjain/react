#!/bin/bash

cd widgetServer
npm i
npm run build
node server.js &
cd ..
php -S localhost:3333
