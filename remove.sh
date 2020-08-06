#!/bin/bash

WORKDIR=HOME/docker/platform-machines3/volumes

./shutdown.sh

echo "Removing containers..."
docker rm gateway
docker rm cassandra
docker rm elastic
#docker rm kibana
docker rm boodskap
docker network rm platformnet

echo "Removing volumes"
rm -rf $WORKDIR
