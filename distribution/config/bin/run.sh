#!/bin/bash

_term() { 
  echo "Caught SIGTERM signal!" 
  killall java
}

trap _term SIGTERM

if [ -d "/opt/boodskap/solution" ] 
then
    cd /opt/boodskap/solution
    npm install
    echo "Starting custom solution"
    pm2 start /opt/boodskap/solution/server.js
else
    echo "No solution directory configured"
fi

if [ -d "/opt/boodskap/console" ] 
then
    cd /opt/boodskap/console
    npm install
    echo "Starting custom admin console"
    pm2 start /opt/boodskap/console/bdskp-admin-console-node.js
else
    echo "Starting default admin console"
    cd $CONSOLE_HOME
    npm install
    pm2 start $CONSOLE_HOME/bdskp-admin-console-node.js
fi

if [ -d "/opt/boodskap/dashboard" ] 
then
    cd /opt/boodskap/dashboard
    npm install
    echo "Starting custom dashboard"
    pm2 start /opt/boodskap/dashboard/bdskp-dashboard-node.js
else
    echo "Starting default dashboard"
    cd $DASHBOARD_HOME
    npm install
    pm2 start $DASHBOARD_HOME/bdskp-dashboard-node.js
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

$JAVA $VMARGS -cp "$CPATH" io.boodskap.iot.Server
