#!/bin/bash

_term() { 
  echo "Caught SIGTERM signal!" 
  killall java
}

trap _term SIGTERM


if [ $DEVELOPMENT == true ]; then
	echo "**** Development mode ****"
else
	echo "**** Production mode ****"
fi

export M2_HOME=${DATA_PATH}/.m2
export MAVEN_OPTS="-Dmaven.repo.local=${M2_HOME}"
export BOODSKAP_HOME=${MOUNT_HOME}/platform
export CONSOLE_HOME=${MOUNT_HOME}/admin-console
export DASHBOARD_HOME=${MOUNT_HOME}/dashboard
export EXAMPLES_HOME=${MOUNT_HOME}/examples

if [ $DEVELOPMENT == true ]; then
	export BOODSKAP_HOME=${MOUNT_HOME}/platform/distribution/target/release
fi

echo "MOUNT_HOME=${MOUNT_HOME}"
echo "BOODSKAP_HOME=${BOODSKAP_HOME}"
echo "DATA_PATH=${DATA_PATH}"
echo "CONSOLE_HOME=${CONSOLE_HOME}"
echo "DASHBOARD_HOME=${DASHBOARD_HOME}"
echo "EXAMPLES_HOME=${EXAMPLES_HOME}"
echo "START_SCRIPT=${START_SCRIPT}"
echo "M2_HOME=${M2_HOME}"
echo "MAVEN_OPTS=${MAVEN_OPTS}"

if [ $DEVELOPMENT == true ]; then
	echo "**** Development mode ****"
	cd ${CONSOLE_HOME}
	npm -s install
	cd ${DASHBOARD_HOME}
	npm -s install
	cd ${MOUNT_HOME}/platform/distribution
	mvn install
	ant local-build
fi

if [ $JDEBUG == true ]; then
	echo "Starting platform in Java remote debug mode at port 9999"
	VMARGS="-Xdebug -Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=9999"
fi


cd ${CONSOLE_HOME}
echo "Starting admin-console"
pm2 start ${CONSOLE_HOME}/bdskp-admin-console-node.js

cd ${DASHBOARD_HOME}
echo "Starting dashboard"
pm2 start ${DASHBOARD_HOME}/bdskp-dashboard-node.js

if [ -d "/opt/boodskap/solution" ] 
then
    cd /opt/boodskap/solution
    echo "Installing custom solution dependencies.. "
    echo "Please wait, it may take some time..."
    npm -s install
    echo "Starting custom solution"
    ${START_SCRIPT}
else
    echo "No custom solution directory configured, starting examples"
    cd ${EXAMPLES_HOME}
    npm -s install
    pm2 start ${EXAMPLES_HOME}/app.js
fi

service nginx start

cd $BOODSKAP_HOME

ROOT_FOLDER=$BOODSKAP_HOME
JAVA=$JAVA_HOME/bin/java


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

$JAVA -version

EXEC="$JAVA $VMARGS -cp $CPATH io.boodskap.iot.Server"
echo $EXEC
$EXEC
