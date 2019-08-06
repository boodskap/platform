FROM boodskapiot/ubuntu:18.04
LABEL maintainer="platform@boodskap.io" description="Boodskap IoT Platform"

ARG INSTALL_DIR=/usr/local/software
ARG SOLUTION_START_SCRIPT="pm2 start bin/www"

ENV BOODSKAP_HOME ${INSTALL_DIR}/platform
ENV CONSOLE_HOME ${INSTALL_DIR}/admin-console
ENV DASHBOARD_HOME ${INSTALL_DIR}/dashboard
ENV EXAMPLES_HOME ${INSTALL_DIR}/examples
ENV SOLUTION_DIR /opt/boodskap/solution
ENV EXT_LIBS_DIR /opt/boodskap/libs

ENV DATA_PATH ${BOODSKAP_HOME}/data
ENV START_SCRIPT ${SOLUTION_START_SCRIPT}
ENV M2_HOME ${INSTALL_DIR}/.m2
ENV MAVEN_OPTS "-Dmaven.repo.local=${M2_HOME}"
ENV DEVELOPMENT false
ENV JDEBUG false

ENV CACHE_SPI_LIBDIR local
ENV GRID_SPI_LIBDIR local
ENV STORAGE_SPI_LIBDIR hsqldb
ENV PROTOCOL_SPI_LIBDIRS "udp,mqtt,ftp"
ENV SERVICE_SPI_LIBDIRS "nodejs"

#Copy nginx files
COPY files/nginx /etc/nginx/sites-enabled/

RUN mkdir -p ${INSTALL_DIR}

WORKDIR ${INSTALL_DIR}

COPY ./target/release/bin ./platform/bin/
COPY ./target/release/config ./platform/config/
COPY ./target/release/deplibs ./platform/deplibs/
COPY ./target/release/libs /platform/libs/
COPY ./target/release/spi-libs /platform/spi-libs/

RUN git clone https://github.com/boodskap/admin-console.git
RUN git clone https://github.com/boodskap/dashboard.git

WORKDIR ${INSTALL_DIR}/admin-console
RUN npm install

WORKDIR ${INSTALL_DIR}/dashboard
RUN npm install

WORKDIR ${INSTALL_DIR}

RUN chmod +x ./platform/bin/run.sh


#
# default webserver listens on port 80 http://boodskap.xyz
#
# 1883 -> MQTT
# 4201 -> Admin Console Web Application
# 4202 -> Dashboard Web Application
# 9999 -> Java remote debug port (environment variable JDEBUG should be set to true)
#
EXPOSE 80 443 1883 5555/udp 18080 4201 4202 9999

#CMD ["env"]
ENTRYPOINT ${BOODSKAP_HOME}/bin/run.sh
