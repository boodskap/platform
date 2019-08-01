#!/bin/bash
docker build -f Dockerfile -t boodskapiot/dashboard:latest .
docker push boodskapiot/dashboard:latest
