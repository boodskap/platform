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

START_SCRIPT="pm2 start server.js"

#----------- XXX ------------------------

#
# For most use cases leave this flag to false
#
# If you are extending/customizing the boodskap platform, set this flag to true
# All three projects will be cloned and kept under your $HOME/docker/volumes/${NAME}
#
DEVELOPMENT=false

#
# For debugging platform server using Java remote debugging on port 9999
#
#
JDEBUG=false

ENV="-e JDEBUG=${JDEBUG}"

if [ $DEVELOPMENT == true ]; then
    MOUNT_HOME=$HOME/docker/volumes/${NAME}
    VOLUMES="-v ${MOUNT_HOME}:/usr/local/boodskap"
    ENV="$ENV -e MOUNT_HOME=/usr/local/boodskap"
    mkdir -p ${MOUNT_HOME}
    cd ${MOUNT_HOME}
    git clone https://github.com/boodskap/admin-console.git
    git clone https://github.com/boodskap/dashboard.git
    git clone https://github.com/boodskap/platform.git
    git clone https://github.com/boodskap/examples.git
else
    DATA_PATH=$HOME/docker/volumes/${NAME}/data
    mkdir -p ${DATA_PATH}
    VOLUMES="-v ${DATA_PATH}:/data/boodskap"
    ENV="$ENV -e DATA_PATH=/data/boodskap"
fi

ENV="$ENV -e DEVELOPMENT=${DEVELOPMENT}"

if [[ -z "$SOLUTION_PATH" ]]; then
    echo "No solution configured, using default examples"
else
    VOLUMES="${VOLUMES} -v ${SOLUTION_PATH}:/opt/boodskap/solution"
fi

#
# These ports will be binding locally too
# Make sure, these ports are free and bindable in your local machine
#
PORTS="80 443 1883 9999"
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

if [[ -z "$SOLUTION_PATH" ]]; then
    EXEC="docker create --name $NAME $ENV $VOLUMES $OPORTS boodskapiot/platform:$VERSION"
else
    EXEC="docker create --name $NAME $ENV -e START_SCRIPT=\"${START_SCRIPT}\" $VOLUMES $OPORTS boodskapiot/platform:$VERSION"
fi

echo
echo
echo "** Execute the below command to create ${NAME} container **"
echo

echo $EXEC
echo


echo "#### To start ${NAME} ####"
printf "\tdocker start ${NAME} && docker logs -f ${NAME}\n"

echo "#### To stop ${NAME} ####"
printf "\tdocker stop ${NAME}\n"

echo "#### To delete ${NAME} container ####"
printf "\t docker container rm ${NAME}\n"

echo
echo "#### Solution URL: http://boodskap.xyz  ####"
echo "#### Admin URL: http://platform.boodskap.zyz ####"
echo "#### Dashboard URL: http://dashboard.boodskap.xyz ####"
echo
echo "#### ${NAME} data can be found in ${DATA_PATH} ####"
echo
