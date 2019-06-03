FROM ubuntu:18.04
MAINTAINER Boodskap <platform@boodskap.io>

ARG HOME_DIR=/usr/local/boodskap
ARG DASHBOARD_DIR=/usr/share/boodskap/dashboard
ARG CONSOLE_DIR=/usr/share/boodskap/console
ARG M2_DIR=${HOME_DIR}/data/.m2
ARG SOLUTION_START_SCRIPT="pm2 start app.js"

WORKDIR /

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install --fix-missing -y python unzip nginx  wget sudo nano nodejs npm git curl software-properties-common
#RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN npm install pm2 -g
RUN add-apt-repository -y ppa:openjdk-r/ppa
RUN apt-get update -y
RUN apt-get install -y openjdk-8-jdk
RUN update-alternatives --config java
RUN apt-get install -y --fix-missing ant maven

ENV BOODSKAP_HOME ${HOME_DIR}
ENV DASHBOARD_HOME ${DASHBOARD_DIR}
ENV CONSOLE_HOME ${CONSOLE_DIR}
ENV DATA_PATH ${BOODSKAP_HOME}/data
ENV CONFIG_FOLDER ${DATA_PATH}/config
ENV CONFIG_FILE ${CONFIG_FOLDER}/boodskap.conf
ENV NGINX_HOME /etc/nginx
ENV M2_HOME ${M2_DIR}
ENV MAVEN_OPTS "-Dmaven.repo.local=${M2_HOME}"
ENV START_SCRIPT ${SOLUTION_START_SCRIPT}

ENV CACHE_FACTORY io.boodskap.iot.spi.cache.local.LocalCacheFactory
ENV GRID_FACTORY io.boodskap.iot.spi.grid.local.LocalGridFactory
ENV STORAGE_FACTORY io.boodskap.iot.spi.storage.jpa.JPAStorageFactory
ENV RAW_STORAGE_FACTORY io.boodskap.iot.spi.storage.jpa.JPARawStorageFactory
ENV DYNAMIC_STORAGE_FACTORY io.boodskap.iot.spi.storage.jpa.JPADynamicStorageFactory
ENV STORAGE_CONFIG io.boodskap.iot.spi.storage.jpa.config.HSQLDBConfig
ENV RAW_STORAGE_CONFIG io.boodskap.iot.spi.storage.jpa.config.HSQLDBConfig
ENV DYNAMIC_STORAGE_CONFIG io.boodskap.iot.spi.storage.jpa.config.HSQLDBConfig

ENV CACHE_SPI_LIBDIR local
ENV GRID_SPI_LIBDIR local
ENV STORAGE_SPI_LIBDIR hsqldb
ENV PROTOCOL_SPI_LIBDIRS "udp,mqtt,ftp"
ENV SERVICE_SPI_LIBDIRS ""

RUN mkdir -p ${BOODSKAP_HOME}
RUN mkdir -p ${CONSOLE_HOME}
RUN mkdir -p ${DASHBOARD_HOME}

WORKDIR ${CONSOLE_HOME}
#Copy admin console files
RUN git clone https://github.com/boodskap/admin-console.git
RUN mv admin-console/* .
RUN rm -rf admin-console

WORKDIR ${DASHBOARD_HOME}
#Copy dashboard files
RUN git clone https://github.com/boodskap/dashboard.git
RUN mv dashboard/* .
RUN rm -rf dashboard

# Clone and Build Platform
WORKDIR ${BOODSKAP_HOME}
RUN git clone https://github.com/boodskap/platform.git

WORKDIR ${NGINX_HOME}/sites-enabled
RUN rm default
#Copy nginx files
COPY files/nginx ${NGINX_HOME}/sites-enabled/

WORKDIR ${BOODSKAP_HOME}
RUN cp -Ra platform/distribution/config/bin .

EXPOSE 80 443 1883 5555/udp

ENTRYPOINT ${BOODSKAP_HOME}/bin/run.sh
