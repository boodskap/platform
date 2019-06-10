# Boodskap IoT Platform

<img src="https://raw.githubusercontent.com/boodskap/platform/master/files/boodskap-model.png" alt="The Launch Pad for your IoT needs." width="100%"/>

<span style="color:red">**Not a production version, Production release 3.1.0 will be released by mid July 2019**</span>

# Installing as Docker Container
* **docker** pull boodskapiot/platform:latest
* **docker** run --name boodskap -v $HOME/boodskap/data:/usr/local/boodskap/data boodskapiot/platform:latest
* Once you see the following message or similar to this
  * All initialization done, platform services are running.
* Open a browser location to **http://boodskap.xyz**
* The default login credentials are
  * User Name: **admin**
  * Password: **admin**
  
* API endpoint
  * Master API http://boodskap.xyz/api
  * Micro Service API http://boodskap.xyz/mservice

* Sample shell script to create named containers

### NOTE
> You can have multiple containers with different names, but; be sure to run only one at any point in time to avoid port conflicts. If you want to run multiple containers in parallel, change the MPORTS and MUDP_PORTS to suit your needs

```bash
#!/bin/bash
VERSION=latest
NAME=platform

#---------------------------------------
# Custom Solution Development Settings
#----------------------------------------

#
# You can use the container instance to develop your custom solution locally
# Your UI can be viewed in http://boodskap.xyz URL
# Root folder of your source code (generally git root folder)
#
SOLUTION_PATH=

# Generally node.js based application is preferred
# The default main entry file is ** app.js **
# Your could use other start methods too
# Make sure your application listens to Host:127.0.0.1/0.0.0.0 Port:10000
#
# *** Don't use npm start ***
#
START_SCRIPT="pm2 start app.js"

#----------- XXX ------------------------

#
# For most use cases leave this flag to false
# 
# If you are extending/customizing the boodskap platform, set this flag to true
# All three projects will be cloned and kept under your $HOME/docker/volumes/${NAME}
#
DEVELOPMENT=false

if [ $DEVELOPMENT == true ]; then
    echo "**** DEVELOPMENT CONFIG ****"
    MOUNT_HOME=$HOME/docker/volumes/${NAME}
    VOLUMES="-v ${MOUNT_HOME}:/usr/local/boodskap"
    ENV="-e MOUNT_HOME=/usr/local/boodskap"
    mkdir -p ${MOUNT_HOME}
    cd ${MOUNT_HOME}
    git clone https://github.com/boodskap/admin-console.git
    git clone https://github.com/boodskap/dashboard.git
    git clone https://github.com/boodskap/platform.git

else
    echo "**** PRODUCTION CONFIG  ****"
    DATA_PATH=$HOME/docker/volumes/${NAME}/data
    mkdir -p ${DATA_PATH}
    VOLUMES="-v ${DATA_PATH}:/var/lib/boodskap"
    ENV="-e DATA_PATH=/var/lib/boodskap"
fi

ENV="$ENV -e DEVELOPMENT=${DEVELOPMENT}"

if [[ -z "$SOLUTION_PATH" ]]; then
    echo "No solution configured"
else
    VOLUMES="-v ${SOLUTION_PATH}:/opt/boodskap/solution"
fi

#
# These ports will be binding locally too
# Make sure, these ports are free and bindable in your local machine
#
PORTS="80 443 1883"
UDP_PORTS="5555"

#
# For running multiple platform containers, disable PORTS and UDP_PORTS and enable the below two
# Format: Local_Port:Remote_Port
#
#MPORTS="8080:80 8443:443 1883:2883"
#MUDP_PORTS="6666:5555"

if [[ -z "$MPORTS" ]]; then

    for PORT in ${PORTS}
    do
       OPORTS="$OPORTS -p $PORT:$PORT"
    done

    for PORT in ${UDP_PORTS}
    do
       OPORTS="$OPORTS -p $PORT:${PORT}/udp"
    done

else

    for MPORT in ${MPORTS}
    do
       OPORTS="$OPORTS -p $MPORT"
    done

    for MPORT in ${MUDP_PORTS}
    do
       OPORTS="$OPORTS -p ${MPORT}/udp"
    done

fi

EXEC="docker run --name $NAME $ENV $VOLUMES $OPORTS boodskapiot/platform:$VERSION"

echo "#### To Stop : docker stop ${NAME}"
echo "#### To Start: docker start ${NAME}"
echo "#### Open URL: http://boodskap.xyz  ####"

#Stop if the container is running
docker stop $NAME

#Remove the container if already exists
docker container rm $NAME

echo $EXEC

#Start the container
$EXEC
```
