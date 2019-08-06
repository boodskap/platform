#!/bin/bash
CURDIR=`pwd`
mvn clean install package -f pom.local.xml
ant
chmod +x ${CURDIR}/target/release/bin/*.sh
