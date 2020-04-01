# Boodskap IoT Platform

<img src="https://raw.githubusercontent.com/boodskap/platform/master/distribution/files/boodskap-model.png" alt="The Launch Pad for your IoT needs." width="100%"/>

<span style="color:red">**Not a production version, Production release 3.1.0 will be released by mid May 2020**</span>

# Installing as Docker Containers
```bash
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
```

# Docker container startup script
```bash
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
```

# Docker container shutdown script
```bash
#!/bin/bash

echo "Shutting down containers..."

docker stop gateway
docker stop boodskap
docker stop cassandra
docker stop kibana
docker stop elastic
docker stop emqx

```

# Docker containers remove sript
```bash
#!/bin/bash

WORKDIR=HOME/docker/platform-machines3/volumes

./shutdown.sh

echo "Removing containers..."
docker rm gateway
docker rm cassandra
docker rm elastic
docker rm emqx
docker rm kibana
docker rm boodskap
docker network rm platformnet

echo "Removing volumes"
rm -rf $WORKDIR
```

# Docker installation can be accessed using
* Open a browser location to 
  * Your solution can be accessed here **http://boodskap.xyz**
  * Admin Console can be accessed here **http://platform.boodskap.xyz**
  * Dashboard can be accessed here **http://dashboard.boodskap.xyz**
* The default login credentials are
  * User Name: **admin**
  * Password: **admin**
  
* API endpoint
  * Master API http://boodskap.xyz/api
  * Micro Service API http://boodskap.xyz/mservice

### NOTE
> You can have multiple containers with different names, but; be sure to run only one at any point in time to avoid port conflicts. If you want to run multiple containers in parallel, change the MPORTS and MUDP_PORTS to suit your needs

[**Download sample shell script to create named containers**](https://raw.githubusercontent.com/boodskap/platform/master/create-container.sh)
