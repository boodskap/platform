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

echo "MOUNT_HOME=${MOUNT_HOME}"
echo "BOODSKAP_HOME=${BOODSKAP_HOME}"
echo "DATA_PATH=${DATA_PATH}"
echo "CONSOLE_HOME=${CONSOLE_HOME}"
echo "DASHBOARD_HOME=${DASHBOARD_HOME}"
echo "EXAMPLES_HOME=${EXAMPLES_HOME}"
echo "START_SCRIPT=${START_SCRIPT}"
echo "M2_HOME=${M2_HOME}"
echo "MAVEN_OPTS=${MAVEN_OPTS}"
echo "SOLUTION_DIR=${SOLUTION_DIR}"
echo "EXT_LIBS_DIR=${EXT_LIBS_DIR}"

if [ $DEVELOPMENT == true ]; then
	echo "**** Development mode ****"
	cd ${CONSOLE_HOME}
	echo "Installing admin-console deps, please wait..."
	npm -s install
	cd ${DASHBOARD_HOME}
	echo "Installing dashboard deps, please wait..."
	npm -s install
fi

if [ $JDEBUG == true ]; then
	echo "Starting platform in Java remote debug mode at port 9999"
	VMARGS="-Xdebug -Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=9999"
fi


cd ${CONSOLE_HOME}
echo "Starting admin-console"
pm2 start ${CONSOLE_HOME}/bdskp-admin-console-node.js

cd ${DASHBOARD_HOME}
echo "Starting dashboard"
pm2 start ${DASHBOARD_HOME}/bdskp-dashboard-node.js

if [ -d "$SOLUTION_DIR" ] 
then
    cd $SOLUTION_DIR
    echo "Installing custom solution dependencies, please wait..."
    npm -s install
    echo "Starting custom solution"
    ${START_SCRIPT}
else
    echo "No custom solution directory configured, starting examples"
    cd ${EXAMPLES_HOME}
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


#Comma separated services [nodejs]
if [ -z "$SERVICE_SPI_LIBDIRS" ]
then
      SERVICE_SPI_LIBDIRS="nodejs"
fi

CPATH=$ROOT_FOLDER/config
CPATH=$CPATH:$ROOT_FOLDER/spi-libs/cache/$CACHE_SPI_LIBDIR/*
CPATH=$CPATH:$ROOT_FOLDER/spi-libs/grid/$GRID_SPI_LIBDIR/*
CPATH=$CPATH:$ROOT_FOLDER/spi-libs/storage/$STORAGE_SPI_LIBDIR/*
CPATH=$CPATH:$EXT_LIBS_DIR/*

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
