#!/bin/bash
CURDIR=`pwd`
mvn clean package
ant
chmod +x ${CURDIR}/target/release/bin/*.sh
