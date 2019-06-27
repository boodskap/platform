FROM ubuntu:18.04
MAINTAINER Boodskap <platform@boodskap.io>

ARG MOUNT_DIR=/usr/local/software
ARG SOLUTION_START_SCRIPT="pm2 start app.js"

ENV MOUNT_HOME ${MOUNT_DIR}
ENV DATA_PATH ${MOUNT_HOME}/platform/data
ENV CONFIG_FOLDER ${MOUNT_HOME}/platform/config
ENV START_SCRIPT ${SOLUTION_START_SCRIPT}
ENV M2_HOME ${MOUNT_HOME}/.m2
ENV MAVEN_OPTS "-Dmaven.repo.local=${M2_HOME}"
ENV DEVELOPMENT false
ENV JDEBUG false

ENV CACHE_SPI_LIBDIR local
ENV GRID_SPI_LIBDIR local
ENV STORAGE_SPI_LIBDIR hsqldb
ENV PROTOCOL_SPI_LIBDIRS "udp,mqtt,ftp"
ENV SERVICE_SPI_LIBDIRS ""

WORKDIR /
RUN apt-get -y update && apt-get install -y nginx sudo nodejs npm git software-properties-common 
RUN npm install pm2 -g
RUN add-apt-repository -y ppa:openjdk-r/ppa
RUN apt-get update -y
RUN apt-get install -y openjdk-8-jdk
RUN update-alternatives --config java
RUN apt-get install -y --fix-missing ant maven
RUN apt-get clean && apt-get autoclean && apt-get autoremove 

WORKDIR /etc/nginx/sites-enabled
RUN rm default
#Copy nginx files
COPY files/nginx /etc/nginx/sites-enabled/

RUN mkdir -p ${MOUNT_HOME}

#Copy admin console files
COPY gfiles/gitconsole /
WORKDIR ${MOUNT_HOME}
RUN git clone https://github.com/boodskap/admin-console.git
WORKDIR ${MOUNT_HOME}/admin-console
RUN npm -s install

#Copy dashboard files
COPY gfiles/gitdashboard /
WORKDIR ${MOUNT_HOME}
RUN git clone https://github.com/boodskap/dashboard.git
WORKDIR ${MOUNT_HOME}/dashboard
RUN npm -s install

#Copy examples files
COPY gfiles/gitexamples /
WORKDIR ${MOUNT_HOME}
RUN git clone https://github.com/boodskap/examples.git
WORKDIR ${MOUNT_HOME}/examples
RUN npm -s install

# Clone and Build Platform
COPY gfiles/gitplatform /
WORKDIR ${MOUNT_HOME}
RUN git clone https://github.com/boodskap/platform.git
WORKDIR ${MOUNT_HOME}/platform
RUN cp -Ra distribution/config/bin . && chmod +x bin/*.sh
WORKDIR ${MOUNT_HOME}/platform/distribution
RUN mvn dependency:go-offline -B
RUN mvn package
RUN ant

# delete all the apt list files since they're big and get stale quickly
RUN rm -rf /var/lib/apt/lists/*
# this forces "apt-get update" in dependent images, which is also good
# (see also https://bugs.launchpad.net/cloud-images/+bug/1699913)

# make systemd-detect-virt return "docker"
# See: https://github.com/systemd/systemd/blob/aa0c34279ee40bce2f9681b496922dedbadfca19/src/basic/virt.c#L434
RUN mkdir -p /run/systemd && echo 'docker' > /run/systemd/container

WORKDIR ${MOUNT_HOME}

#
# default webserver listens on port 80 http://boodskap.xyz
#
# 1883 -> MQTT
# 4201 -> Admin Console Web Application
# 4202 -> Dashboard Web Application
# 9999 -> Java remote debug port (environment variable JDEBUG should be set to true)
#
EXPOSE 80 443 1883 5555/udp 18080 4201 4202 9999

ENTRYPOINT ${MOUNT_HOME}/platform/bin/run.sh
