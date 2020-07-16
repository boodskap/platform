#!/bin/bash
#
# Script to setup platform docker machines
# Usage: ./create.sh (One time only)
# Starting: ./startup.sh
# Stopping: ./shutdown.sh
# Removing: ./remove.sh (warning, will delete all data)
#

PLATFORM_VERSION=latest
UI_VERSION=latest
CASSANDRA_VERSION=3.11.5
ELASTIC_VERSION=7.5.1
KIBANA_VERSION=7.5.1
EMQX_VERSION=3.2.7

VOL_DIR=$HOME/docker/platform-machines3/volumes
VOL_CASSANDRA=$VOL_DIR/cassandra
VOL_ELASTIC=$VOL_DIR/elastic
VOL_EMQX=$VOL_DIR/emqx
VOL_KIBANA=$VOL_DIR/kibana
VOL_BOODSKAP=$VOL_DIR/boodskap

mkdir -p $VOL_DIR

docker pull boodskapiot/cassandra:${CASSANDRA_VERSION}
docker pull boodskapiot/elastic:${ELASTIC_VERSION}
docker pull boodskapiot/emqx:${EMQX_VERSION}
docker pull boodskapiot/kibana:${KIBANA_VERSION}
docker pull boodskapiot/platform:${PLATFORM_VERSION}
docker pull boodskapiot/gateway:${UI_VERSION}

docker network create --subnet=10.1.1.0/24 platformnet
docker container create --env-file cass-env.txt --privileged --net platformnet -p 9042:9042 --ip 10.1.1.3 --hostname cassandra --name cassandra -v $VOL_CASSANDRA:/root/data boodskapiot/cassandra:${CASSANDRA_VERSION}
docker container create --env-file es-env.txt --privileged --net platformnet -p 9200:9200 --ip 10.1.1.4 --hostname elastic --name elastic -v $VOL_ELASTIC:/home/elastic/data boodskapiot/elastic:${ELASTIC_VERSION}
docker container create --net platformnet -p 1883:1883 -p 8083:8083 --ip 10.1.1.5 --hostname emqx --name emqx -v $VOL_EMQX:/root/data/mnesia boodskapiot/emqx:${EMQX_VERSION}
docker container create --net platformnet -p 5601:5601 --ip 10.1.1.6 --hostname kibana --name kibana -v $VOL_KIBANA:/home/kibana/data boodskapiot/kibana:${KIBANA_VERSION}
docker container create --net platformnet -p 5555:5555/udp -p 18080:18080 -p 19090:19090 -p 2021:2021 --ip 10.1.1.2 --hostname boodskap --name boodskap -v $VOL_BOODSKAP/data:/root/data -v $VOL_BOODSKAP/work:/root/work boodskapiot/platform:${PLATFORM_VERSION}
docker container create --net platformnet -p 80:80 --ip 10.1.1.254 --hostname gateway --name gateway boodskapiot/gateway:${UI_VERSION}
