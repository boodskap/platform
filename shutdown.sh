#!/bin/bash

echo "Shutting down containers..."

docker stop gateway
docker stop boodskap
docker stop cassandra
#docker stop kibana
docker stop elastic

