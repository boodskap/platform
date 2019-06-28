#!/bin/bash
mvn dependency:go-offline -B
mvn package
ant
