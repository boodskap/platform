#!/bin/bash

_term() { 
  echo "Caught SIGTERM signal!" 
  killall java
}

trap _term SIGTERM

export BOODSKAP_HOME=${MOUNT_HOME}/platform
export CONSOLE_HOME=${MOUNT_HOME}/admin-console
export DASHBOARD_HOME=${MOUNT_HOME}/dashboard

if [ $DEVELOPMENT == true ]; then
	echo "**** Development mode ****"
	export DATA_PATH=${BOODSKAP_HOME}/data
	export CONFIG_FOLDER=${BOODSKAP_HOME}/config
	export M2_HOME=${MOUNT_HOME}/.m2
	export MAVEN_OPTS="-Dmaven.repo.local=${M2_HOME}"
else
	echo "**** Production mode ****"
	export M2_HOME=${DATA_PATH}/.m2
	export MAVEN_OPTS="-Dmaven.repo.local=${M2_HOME}"
fi

echo "MOUNT_HOME=${MOUNT_HOME}"
echo "BOODSKAP_HOME=${BOODSKAP_HOME}"
echo "DASHBOARD_HOME=${DASHBOARD_HOME}"
echo "CONSOLE_HOME=${DASHBOARD_HOME}"
echo "START_SCRIPT=${START_SCRIPT}"
echo "M2_HOME=${M2_HOME}"
echo "MAVEN_OPTS=${MAVEN_OPTS}"
echo "DATA_PATH=${DATA_PATH}"
echo "CONFIG_FOLDER=${CONFIG_FOLDER}"

echo "Building Boodskap IoT Platform"
echo "Please wait, it may take a long time..."
sleep 2

cd ${BOODSKAP_HOME}/distribution
rm -rf ${M2_HOME}/repository/io/boodskap
ant container-copy

cd ${CONSOLE_HOME}/admin-console
echo "Installing admin-console dependencies.. "
echo "Please wait, it may take some time..."
npm -s install
echo "Starting admin-console"
pm2 start ${CONSOLE_HOME}/bdskp-admin-console-node.js

cd ${DASHBOARD_HOME}/dashboard
echo "Installingdashboard dependencies.. "
echo "Please wait, it may take some time..."
npm -s install
echo "Starting dashboard"
pm2 start ${DASHBOARD_HOME}/bdskp-dashboard-node.js

if [ -d "/opt/boodskap/solution" ] 
then
    cd /opt/boodskap/solution
    echo "Installing solution dependencies.. "
    echo "Please wait, it may take some time..."
    npm -s install
    echo "Starting custom solution"
    ${START_SCRIPT}
else
    echo "No solution directory configured"
fi

service nginx start

cd $BOODSKAP_HOME

ROOT_FOLDER=$BOODSKAP_HOME
JAVA=$JAVA_HOME/bin/java
VMARGS=""


if [ -z "$ROOT_FOLDER" ]
then
      ROOT_FOLDER=$HOME
fi

if [ -z "$JAVA_HOME" ]
then
      JAVA=java
fi

#Cache implementation [ignite | local]
if [ -z "$CACHE_SPI_LIBDIR" ]
then
      CACHE_SPI_LIBDIR=local
fi

#Grid implementation [ignite | local]
if [ -z "$GRID_SPI_LIBDIR" ]
then
      GRID_SPI_LIBDIR=local
fi


#Storage implementation [cassandra | elasticsearch | hsqldb | mysql]
if [ -z "$STORAGE_SPI_LIBDIR" ]
then
      STORAGE_SPI_LIBDIR=hsqldb
fi

#Comma separated protocols [udp,mqtt,ftp]
if [ -z "$PROTOCOL_SPI_LIBDIRS" ]
then
      PROTOCOL_SPI_LIBDIRS="udp,mqtt,ftp"
fi


#Comma separated services []
if [ -z "$SERVICE_SPI_LIBDIRS" ]
then
      SERVICE_SPI_LIBDIRS=""
fi

CPATH=$ROOT_FOLDER/config
CPATH=$CPATH:$ROOT_FOLDER/spi-libs/cache/$CACHE_SPI_LIBDIR/*
CPATH=$CPATH:$ROOT_FOLDER/spi-libs/grid/$GRID_SPI_LIBDIR/*
CPATH=$CPATH:$ROOT_FOLDER/spi-libs/storage/$STORAGE_SPI_LIBDIR/*

for CP in ${PROTOCOL_SPI_LIBDIRS//,/ }
do
   CPATH=$CPATH:$ROOT_FOLDER/spi-libs/protocols/$CP/*
done

for CP in ${SERVICE_SPI_LIBDIRS//,/ }
do
   CPATH=$CPATH:$ROOT_FOLDER/spi-libs/services/$CP/*
done

CPATH=$CPATH:$ROOT_FOLDER/libs/*

EXEC=$JAVA $VMARGS -cp "$CPATH" io.boodskap.iot.Server
ECHO $EXEC
$EXEC
