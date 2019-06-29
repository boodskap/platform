FROM maven:3.5-jdk-8 as maven

RUN mkdir /platform
WORKDIR /platform

COPY ./distribution/pom.xml ./pom.xml
COPY ./distribution/spi-grid-local/pom.xml ./spi-grid-local/pom.xml
COPY ./distribution/spi-cache-local/pom.xml ./spi-cache-local/pom.xml
COPY ./distribution/driver-mysql/pom.xml ./driver-mysql/pom.xml
COPY ./distribution/server/pom.xml ./server/pom.xml
COPY ./distribution/protocol-service-udp/pom.xml ./protocol-service-udp/pom.xml
COPY ./distribution/spi-cache-ignite/pom.xml ./spi-cache-ignite/pom.xml
COPY ./distribution/spi-storage-pojo/pom.xml ./spi-storage-pojo/pom.xml
COPY ./distribution/spi-storage-elasticsearch/pom.xml ./spi-storage-elasticsearch/pom.xml
COPY ./distribution/driver-hsqldb/pom.xml ./driver-hsqldb/pom.xml
COPY ./distribution/spi-storage-cassandra/pom.xml ./spi-storage-cassandra/pom.xml
COPY ./distribution/spi-grid-ignite/pom.xml ./spi-grid-ignite/pom.xml

RUN mvn dependency:go-offline -B

COPY ./distribution ./

RUN mvn package

FROM boodskapiot/ubuntu:18.04 as ant

COPY --from=maven /platform /platform

WORKDIR /platform

RUN ant

FROM boodskapiot/admin-console as console
FROM boodskapiot/dashboard as dashboard
#FROM boodskapiot/examples as examples
FROM boodskapiot/ubuntu:18.04

ARG INSTALL_DIR=/usr/local/software
ARG SOLUTION_START_SCRIPT="pm2 start app.js"

ENV BOODSKAP_HOME ${INSTALL_DIR}/platform
ENV CONSOLE_HOME ${INSTALL_DIR}/admin-console
ENV DASHBOARD_HOME ${INSTALL_DIR}/dashboard
ENV EXAMPLE_HOME ${INSTALL_DIR}/examples

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
ENV SERVICE_SPI_LIBDIRS ""

WORKDIR /etc/nginx/sites-enabled
RUN rm default
#Copy nginx files
COPY files/nginx /etc/nginx/sites-enabled/

RUN mkdir -p ${INSTALL_DIR}

WORKDIR ${INSTALL_DIR}

COPY --from=console /admin-console ./admin-console
COPY --from=dashboard /dashboard ./dashboard
#COPY --from=examples /examples ./examples
COPY --from=ant /platform/target/release ./platform

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
