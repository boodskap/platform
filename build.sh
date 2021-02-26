#!/bin/bash
PVERSION="3.0.2"
PPATCH="0018"
echo "Building with"
echo "docker build --build-arg PVERSION=${PVERSION} --build-arg PPATCH=${PPATCH} -t boodskapiot/platform:${PVERSION}-${PPATCH} -t boodskapiot/platform:latest ."
docker build --build-arg PVERSION=${PVERSION} --build-arg PPATCH=${PPATCH} -t boodskapiot/platform:${PVERSION}-${PPATCH} -t boodskapiot/platform:latest .
