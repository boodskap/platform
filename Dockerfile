FROM ubuntu:18.04

MAINTAINER platform@boodskap.io

LABEL Remarks="Boodskap IoT Platform"

RUN apt-get -y update && apt-get -y install software-properties-common && add-apt-repository -y ppa:openjdk-r/ppa && apt-get update -y && apt-get install -y openjdk-13-jdk
RUN apt-get -y install wget curl
RUN apt-get -y clean && rm -rf /var/cache/apt/lists

ARG PVERSION="3.0.2"
ARG PPATCH="0005"

WORKDIR /root

RUN curl -sL https://github.com/BoodskapPlatform/boodskap-platform/releases/download/v${PVERSION}/boodskap-${PVERSION}.tar.gz | tar xzf - -C /root/

RUN curl -sL https://github.com/BoodskapPlatform/boodskap-platform/releases/download/v${PVERSION}/boodskap-patch-${PVERSION}-${PPATCH}.tar.gz | tar xzf - -C /root/

RUN rm -rf /root/boodskap-*

WORKDIR /root/libs
RUN rm -f patch && rm -rf patches
RUN ln -s /root/patches/${PPATCH} patch

WORKDIR /

COPY root/ /root/
COPY start-boodskap.sh .

RUN chmod +x /start-boodskap.sh
RUN chmod +x /root/bin/*.sh

EXPOSE 1883 18080 19090 2021 40000-60000 5555/udp

CMD ["/start-boodskap.sh"]

