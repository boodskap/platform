#!/bin/bash

WAIT_PERIOD=15

#
# Args: Container, Port, SleepInterval
#
function startAndWait() {
  
  echo "Starting $1..."
  
  docker start $1
  
  nc -z localhost $2

  if [ $? -ne 0 ]; then
    sleep $WAIT_PERIOD
    nc -z localhost $2
  fi

  while [ $? -ne 0 ]
  do
    echo "$1 port:$2 at localhost is not up, trying in $3 seconds..."
    sleep $3
    nc -z localhost  $2
  done

  echo "application $1 is running..."
  echo
}

echo
echo "Starting all containers, this may take a while..."
echo

startAndWait cassandra 9042 15
startAndWait elastic 9200 15
startAndWait emqx 1883 10
startAndWait boodskap 18080 10
startAndWait gateway 80 10
startAndWait kibana 5601 10

#docker start gateway
#docker start cassandra
#docker start elastic
#docker start emqx
#docker start kibana
#docker start boodskap

echo "All containers started!"

