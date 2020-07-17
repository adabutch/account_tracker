# Web UI API DB in Docker

https://gitlab.com/charlesbrandt/web-ui-api-db

A general approach for containerizing web applications. 

The architecture provides four primary layers:

  - web - static server
  - ui  - frontend client
  - api - backend server
  - db  - persistence storage
  
If you have a preferred technology for any given layer, it should be possible to replace the default option with your choice. 

[More details on the architecture](docs/architecture.md)


## Setup

Create shared volumes to ensure container modules are not confused with host level modules (if you run the same services at the host level):

    docker volume create --name=account_tracker_ui_modules
    # docker volume create --name=account_tracker_api_modules

Generate SSL keys with:

    mkdir -p config/ssl
    openssl req -subj '/CN=localhost' -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./config/ssl/nginx.key -out ./config/ssl/nginx.crt

Install node packages for the UI and API with:

    docker-compose -p account_tracker -f docker-compose-admin.yml up -d
    
Then connect to the containers:

    docker-compose -p account_tracker exec ui bash

and run:

    npm install 

The same approach allows running the UI/API build step interactively. Running interactively is useful during development and debugging cycles. 

### Database

To restore the mongodb, connect to the container:

    docker-compose -p account_tracker exec mongo bash

    # will depend on how your local db files are structured... 
    cd /srv/mongodump/mongodump/
    
    # the db destination will depend on how your API is written... 
    mongorestore --host localhost --db account_tracker


## Starting / Stopping 

Bring up the containers:

    docker-compose -p account_tracker up -d

Make sure everything is running (no Exit 1 States):

    docker-compose -p account_tracker ps

To shut down the containers:

    docker-compose -p account_tracker down -v


## Services

Update the `config/nginx.conf` as needed, especially to proxy requests to the API server. 

For the express API config (`app.js`), make sure that the API is listening on 0.0.0.0 *within the container*, not just localhost. This allows other containers on the docker network to access the service:

```
exports.express = {
  host: "0.0.0.0",
  port: 12345,

```


## Docker-compose -p

Using `-p account_tracker` allows the project name (and consequently the container name) to be consistent from one deployment to the next. That way containers are named with `account_tracker_[service]_1`. If you've checked out the repository to a directory named `account_tracker`, the project name `account_tracker` will be assumed by docker and the `-p` option may be omitted. 




