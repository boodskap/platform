#!/bin/bash
REPOSITORY=platform
VERSION=latest
NAME=dev

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
DEVELOPMENT=true

#
# For debugging platform server using Java remote debugging on port 9999
#
#
JDEBUG=true

ENV="-e DEVELOPMENT=${DEVELOPMENT} -e JDEBUG=${JDEBUG}"

DATA_MOUNT=/data/boodskap
PLATFORM_MOUNT=/opt/platform
CONSOLE_MOUNT=/opt/admin-console
DASHBOARD_MOUNT=/opt/dashboard

DATA_PATH=$HOME/docker/volumes/${NAME}/data

mkdir -p ${DATA_PATH}
VOLUMES="-v ${DATA_PATH}:${DATA_MOUNT}"
ENV="$ENV -e DATA_PATH=${DATA_MOUNT}"

if [ $DEVELOPMENT == true ]; then
    
    #Empty echo to avoid bash error
    echo ""
    
    #
    # Boodskap Platform ( git clone https://github.com/boodskap/platform.git )
    # Enable ENV, VOLUMES and BOODSKAP_HOME pointing to <git_path>/distribution/target/release
    #
    #BOODSKAP_HOME=${HOME}/git/platform/distribution/target/release
    #ENV="$ENV -e BOODSKAP_HOME=${PLATFORM_MOUNT}"
    #VOLUMES="$VOLUMES -v ${BOODSKAP_HOME}:${PLATFORM_MOUNT}"

    #
    # Boodskap Admin Console ( git clone https://github.com/boodskap/admin-console.git )
    # Enable ENV, VOLUMES and CONSOLE_HOME pointing to <git_path>
    #
    #CONSOLE_HOME=${HOME}/git/admin-console
    #ENV="$ENV -e CONSOLE_HOME=${CONSOLE_MOUNT}"
    #VOLUMES="$VOLUMES -v ${CONSOLE_HOME}:${CONSOLE_MOUNT}"

    #
    # Boodskap Dashboard ( git clone https://github.com/boodskap/dashboard.git )
    # Enabled ENV, VOLUMES and DASHBOARD_HOME pointing to <git_path>
    #
    #DASHBOARD_HOME=${HOME}/git/dashboard
    #ENV="$ENV -e DASHBOARD_HOME=${DASHBOARD_MOUNT}"
    #VOLUMES="$VOLUMES -v ${DASHBOARD_HOME}:${DASHBOARD_MOUNT}"
fi


if [[ -z "$SOLUTION_PATH" ]]; then
    echo "No solution configured, using default examples"
else
    VOLUMES="${VOLUMES} -v ${SOLUTION_PATH}:/opt/boodskap/solution"
fi

#
# These ports will be binding locally too
# Make sure, these ports are free and bindable in your local machine
#
PORTS="80 443 1883 18080 4201 4202 10000 9999"
UDP_PORTS="5555"

#
# For running multiple platform containers, disable PORTS and UDP_PORTS and enable the below two
# Format: Local_Port:Remote_Port
#
#MPORTS="8080:80 8443:443 2883:1883 28080:18080 24201:4201 24202:4202 20000:10000 29999:9999" 
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
    EXEC="docker create --name $NAME $ENV $VOLUMES $OPORTS boodskapiot/${REPOSITORY}:${VERSION}"
else
    EXEC="docker create --name $NAME $ENV -e START_SCRIPT=\"${START_SCRIPT}\" $VOLUMES $OPORTS boodskapiot/${REPOSITORY}:${VERSION}"
fi

echo
echo "#### To create ${NAME} container ####"
printf "\t${EXEC}\n\n"

echo "#### To start ${NAME} ####"
START_EXEC="docker start ${NAME} && docker logs -f ${NAME}"
RESTART_EXEC="docker restart ${NAME} && docker logs -f ${NAME}"
printf "\t${START_EXEC}\n"
printf "\t${RESTART_EXEC}\n\n"

echo "#### To stop ${NAME} ####"
STOP_EXEC="docker stop ${NAME}"
printf "\t${STOP_EXEC}\n\n"

echo "#### To delete ${NAME} container ####"
REM_EXEC="docker container rm ${NAME}"
printf "\t${REM_EXEC}\n\n"

echo
echo "#### Solution URL: http://boodskap.xyz  ####"
echo "#### Admin URL: http://platform.boodskap.zyz ####"
echo "#### Dashboard URL: http://dashboard.boodskap.xyz ####"
echo
echo "#### ${NAME} data can be found in ${DATA_PATH} ####"
echo

#create script files
ROOT_DIR=$HOME/docker/bin/${NAME}
mkdir -p ${ROOT_DIR}

echo "#!/bin/bash" > ${ROOT_DIR}/create.sh
echo "#!/bin/bash" > ${ROOT_DIR}/start.sh
echo "#!/bin/bash" > ${ROOT_DIR}/restart.sh
echo "#!/bin/bash" > ${ROOT_DIR}/stop.sh
echo "#!/bin/bash" > ${ROOT_DIR}/remove.sh

echo "docker pull boodskapiot/${REPOSITORY}:${VERSION}" >> ${ROOT_DIR}/create.sh
echo ${EXEC} >> ${ROOT_DIR}/create.sh
echo ${START_EXEC} >> ${ROOT_DIR}/start.sh
echo ${RESTART_EXEC} >> ${ROOT_DIR}/restart.sh
echo ${STOP_EXEC} >> ${ROOT_DIR}/stop.sh
echo ${REM_EXEC} >> ${ROOT_DIR}/remove.sh

chmod +x ${ROOT_DIR}/*.sh

echo "#### start/stop scripts are in ${ROOT_DIR} ####"
echo
