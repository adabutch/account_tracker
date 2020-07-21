### Database

To restore the mongodb, connect to the container:

    docker-compose -p account_tracker exec mongo bash

    # will depend on how your local db files are structured... 
    cd /srv/mongodump/mongodump/
    
    # the db destination will depend on how your API is written... 
    mongorestore --host localhost --db account_tracker


