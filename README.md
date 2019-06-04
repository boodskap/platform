# Boodskap IoT Platform

![Platform Illustration](files/boodskap-model.png?raw=true "The Launch Pad for your IoT needs.")

# Installing as Docker Container
* **docker** pull boodskapiot/platform:latest
* **docker** run --name boodskap -v $HOME/boodskap/data:/usr/local/boodskap/data boodskapiot/platform:latest
* Once you see the following message or similar to this
  * All initialization done, platform services are running.
* Open a browser location to **http://boodskap.xyz**
* The default login credentials are
  * User Name: **admin**
  * Password: **admin**

* Sample shell script to create named containers

```bash
#!/bin/bash
VERSION=latest
NAME=platform

#---------------------------------------
# Custom Solution Development Settings
#----------------------------------------

# Generally node.js based application is preferred
# The default main entry file is ** app.js **
# Your could use other start methods too
# Make sure your application listens to Host:127.0.0.1/0.0.0.0 Port:10000
#
# *** Don't use npm start ***
#
START_SCRIPT="pm2 start app.js"

#
SOLUTION_PATH=

#----------- XXX ------------------------

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

PORTS="80 443 1883"
UDP_PORTS="5555"

for PORT in ${PORTS}
do
   OPORTS="$OPORTS -p $PORT:$PORT"
done

for PORT in ${UDP_PORTS}
do
   OPORTS="$OPORTS -p $PORT:${PORT}/udp"
done

EXEC="docker run --name $NAME $ENV $VOLUMES $OPORTS boodskapiot/platform:$VERSION"

echo "#### To Stop : docker stop ${NAME}"
echo "#### To Start: docker start ${NAME}"
echo "#### Open URL: http://boodskap.xyz  ####"

echo $EXEC
$EXEC
```
