# Account Tracker

Account Tracker manages requests for access to systems in use at an organization. Tracking these in a central location helps ensure that users have access to all of the resources they need. Administrators can trigger automated routines for account management when available. Manual tasks can be logged to confirm that tasks have been completed.


## Setup

Account Tracker leverages Docker containers and docker-compose. If you're new to containers or need to get the software installed, [maybe give this guide a try](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04).

Start with the steps outlined for [docker configuration](docker-README.md).

Then, you should be able to start in admin mode:

    docker-compose -f docker-compose-admin.yml up -d
    
And see that everything is running:

    ```
$ docker-compose ps
        Name                    Command           State           Ports         
--------------------------------------------------------------------------------
account_tracker_api_1   tail -f /dev/null         Up                            
account_tracker_ui_1    tail -f /dev/null         Up                            
account_tracker_web_1   /docker-entrypoint.sh     Up      127.0.0.1:8002->443/tc
                        ngin ...                          p,                    
                                                          127.0.0.1:8001->80/tcp

    ```

From here you can connect to either the `ui` container or the `api` container to run installation commands. 

[ui](ui/README.md)
[api](api/README.md)
