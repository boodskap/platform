#!/bin/bash
docker build -f Dockerfile -t boodskapiot/admin-console:latest .
docker push boodskapiot/admin-console:latest
