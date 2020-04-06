# Boodskap IoT Platform

<span style="color:red">**Production version 3.0.1**</span>
<span style="color:green">**Upcoming version 3.0.2 - April end 2020 **</span>

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
docker container create --net platformnet -p 5555:5555/udp -p 18080:18080 -p 19090:19090 -p 2021:2021 --ip 10.1.1.2 --hostname boodskap --name boodskap -v $VOL_BOODSKAP/data:/root/data -v $VOL_BOODSKAP/work:/root/work boodskapiot/platform:3.0.1-10001
docker container create --net platformnet -p 80:80 --ip 10.1.1.254 --hostname gateway --name gateway boodskapiot/gateway:3.0.1

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
# First time setup
Start the containers using the startup.sh script
```bash
$docker logs -f cassandra
```
Wait for the datbase to initialize for the first time, this may take a while depends upon your configuration.
Upon successful initialiation, you should see something like this
```bash
INFO  [main] 2020-04-02 09:33:04,179 Gossiper.java:1780 - Waiting for gossip to settle...
INFO  [main] 2020-04-02 09:33:12,181 Gossiper.java:1811 - No gossip backlog; proceeding
Initialinging database....
Cassandra startup done.
```
Now restart the platform and look for the init messages
```bash
$docker stop boodskap && docker start boodskap && docker logs -f boodskap
```
Upon successful initialization, you should see something like this
```bash
2020-04-02 09:35:15.953 INFO  BootstrapService:193 - All done, node is up and running...
2020-04-02 09:35:15.953 INFO  BootstrapService:195 -


    )             (           )
 ( /(             )\ )     ( /(     )
 )\())  (    (   (()/( (   )\()) ( /(  `  )
((_)\   )\   )\   ((_)))\ ((_)\  )(_)) /(/(
| |(_) ((_) ((_)  _| |((_)| |(_)((_)_ ((_)_\
| '_ \/ _ \/ _ \/ _` |(_-<| / / / _` || '_ \)
|_.__/\___/\___/\__,_|/__/|_\_\ \__,_|| .__/
                                      |_| IoT Platform


>>> ver. 3.0.1 - build(10001)
>>> 2018 Copyright(C) Boodskap Inc
>>>
>>> Boodskap documentation: http://readme.boodskap.io
2020-04-02 09:35:18.659 INFO  ClusterManagerService:44 - Initializing...
2020-04-02 09:35:19.161 INFO  ShellScriptExecutor:48 - Initializing rules engine subsystem...
2020-04-02 09:35:19.303 INFO  ClusterManagerService:59 - Validating cluster nodes...
2020-04-02 09:35:19.305 WARN  BoodskapSystem:264 - Cluster node list rebalanced
2020-04-02 09:35:19.307 INFO  BaseService:96 - ClusterManagerService[id:1] finished
```
If the platform init is not progressing for a very long time (more than 5 minutes) or got stuck here (below), just reboot the platform one more time and you should be good (**docker stop boodskap && docker start boodskap && docker logs -f boodskap**)
```bash
2020-04-02 09:33:48.887 INFO  CacheStore:102 - Initing MSG_SPEC_CACHE cache
2020-04-02 09:35:06.729 ERROR BoodskapSystem:286 - Ignition not initialized, please wait for bootstrap service to start...
```


# Docker installation can be accessed using
* Open a browser location to  **http://boodskap.xyz**
* If you have installed on a machine with public IP address **http://your_public_ip**
* The default login credentials are
  * User Name: **admin**
  * Password: **admin**
    * Generallay, first time installation needs a platform container reboot, you could do that by
    * docker stop boodskap && docker start boodskap
  
* API endpoint
  * Master API http://boodskap.xyz/api
  * Micro Service API http://boodskap.xyz/mservice
