#!/bin/bash
#
# Script to setup platform docker machines
# Usage: ./create.sh (One time only)
# Starting: ./startup.sh
# Stopping: ./shutdown.sh
# Removing: ./remove.sh (warning, will delete all data)
#

VOL_DIR=$HOME/docker/platform-machines3/volumes
VOL_CASSANDRA=$VOL_DIR/cassandra
VOL_ELASTIC=$VOL_DIR/elastic
VOL_EMQX=$VOL_DIR/emqx
VOL_KIBANA=$VOL_DIR/kibana
VOL_BOODSKAP=$VOL_DIR/boodskap

mkdir -p $VOL_DIR

docker pull boodskapiot/cassandra:3.11.5
docker pull boodskapiot/elastic:7.5.1
docker pull boodskapiot/emqx:3.2.7
docker pull boodskapiot/kibana:7.5.1
docker pull boodskapiot/platform:3.0.0
docker pull boodskapiot/gateway:2.0.5

docker network create --subnet=10.1.1.0/24 platformnet
docker container create --privileged --net platformnet -p 9042:9042 --ip 10.1.1.3 --hostname cassandra --name cassandra -v $VOL_CASSANDRA:/root/data boodskapiot/cassandra:3.11.5
docker container create --privileged --net platformnet -p 9200:9200 --ip 10.1.1.4 --hostname elastic --name elastic -v $VOL_ELASTIC:/home/elastic/data boodskapiot/elastic:7.5.1
docker container create --net platformnet -p 1883:1883 -p 8083:8083 --ip 10.1.1.5 --hostname emqx --name emqx -v $VOL_EMQX:/root/data/mnesia boodskapiot/emqx:3.2.7
docker container create --net platformnet -p 5601:5601 --ip 10.1.1.6 --hostname kibana --name kibana -v $VOL_KIBANA:/home/kibana/data boodskapiot/kibana:7.5.1
docker container create --net platformnet -p 18080:18080 -p 19090:19090 -p 2021:2021 --ip 10.1.1.2 --hostname boodskap --name boodskap -v $VOL_BOODSKAP:/root/data boodskapiot/platform:3.0.0
docker container create --net platformnet -p 80:80 --ip 10.1.1.254 --hostname gateway --name gateway boodskapiot/gateway:2.0.5
