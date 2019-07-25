#!/bin/bash
CURDIR=`pwd`
mvn -o clean package
ant
chmod +x ${CURDIR}/target/release/bin/*.sh
