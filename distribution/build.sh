#!/bin/bash
CURDIR=`pwd`
mvn clean install package
ant
chmod +x ${CURDIR}/target/release/bin/*.sh
