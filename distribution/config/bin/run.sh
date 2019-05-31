#!/bin/bash

_term() { 
  echo "Caught SIGTERM signal!" 
  killall java
}

trap _term SIGTERM

cd $CONSOLE_HOME
npm install

cd $DASHBOARD_HOME
npm install

cd $SOLUTION_HOME
npm install

pm2 start $CONSOLE_HOME/bdskp-admin-console-node.js
pm2 start $DASHBOARD_HOME/bdskp-dashboard-node.js
#pm2 start $SOLUTION_HOME/solution.js

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
