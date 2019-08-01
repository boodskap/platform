#!/bin/bash
CURDIR=`pwd`
mvn -o clean package -f pom.local.xml
ant
chmod +x ${CURDIR}/target/release/bin/*.sh
