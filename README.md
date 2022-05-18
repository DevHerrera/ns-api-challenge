<p align="center">
  <a href="https://nicasource.com/" target="blank"><img src="https://media-exp1.licdn.com/dms/image/C561BAQG2_kywxM9I3A/company-background_10000/0/1619825388099?e=1653447600&v=beta&t=Tv8R2gp9uxi05FWSMJrQqRwT6L4FpNTzJ-usRPQ_9UI" width="600" alt="NicaSource Background" /></a>
</p>
  <p align="center">A backend assestment by <a href="https://nicasource.com/" target="_blank">NicaSource</a> company for the mid-senior node.js backend developer.</p>

## Description

[Video Creator Platform](https://ns-deployment.herokuapp.com/docs/) is a project about uploading, consuming, editing and publishing videos through User's account

You can visualize and get an idea of the project by looking at this database diagram ![Database Diagram](https://i.postimg.cc/2yf1pX6V/Nica-Source-challenge-drawio-3.png)

## Installation

```bash
$ npm install
```

## Before running the app

```bash
# Docker container needs to be up

# You can init the docker container ethier with docker compose

version: '2.5.0'
services:
  dev-db:
    image: postgres:13
    network_mode: host
    ports:
      - 5434:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: video_creators
    networks:
      - default
networks:
  default:

# Or with the following bash script (make sure to grant privileges to be able to run it):

#!/bin/bash
set -e

SERVER="my_database_server";
PW="mysecretpassword";
DB="video_creators";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --network="host" --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;

# create the db
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres
```

## Configuring local environment

Create a .env file with the following data

```bash
MODE = DEV
POSTGRES_PASSWORD = mysecrectpassword
POSTGRES_DATABASE = video_creators
POSTGRES_USER = postgres
POSTGRES_PORT = 5432
POSTGRES_HOST = localhost
JWT_SECRET= 'supersecret'
```

Run TypeORM migrations

```bash
$ npm run migration:run
```

Run database seeder

```bash
$ npm run seed:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Test could not be implemented in the estimated time, I'll add them soon anyways.

```bash
# unit tests
```

## Notes

Password for genereted users is 'hahaha'.

## Stay in touch

- Author - [Julio Herrera](https://www.linkedin.com/in/devherrera/)
- Email - cesarchavarria0@gmail.com
- Phone - (+505) 8714-2729
