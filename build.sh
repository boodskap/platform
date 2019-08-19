#!/bin/bash
cd distribution
./build.sh 
cd ..
docker build -t boodskapiot/platform:3.0.0-alpha1 -t boodskapiot/platform:latest .
docker push boodskapiot/platform:latest
