#!/bin/bash
cd distribution
./build.sh 
cd ..
cp ../boodskap-iot-platform3/iot-platform/iot-platform-apigen/src/main/resources/individual/* admin-console/yaml/
docker build -f Dockerfile.local -t boodskapiot/platform:3.0.0-alpha1 -t boodskapiot/platform:latest .
docker push boodskapiot/platform:latest
