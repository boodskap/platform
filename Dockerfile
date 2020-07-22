FROM ubuntu:18.04

MAINTAINER platform@boodskap.io

LABEL Remarks="Boodskap IoT Platform"

RUN apt-get -y update && apt-get -y install software-properties-common && add-apt-repository -y ppa:openjdk-r/ppa && apt-get update -y && apt-get install -y openjdk-13-jdk
RUN apt-get -y install wget
RUN apt-get -y clean && rm -rf /var/cache/apt/lists

WORKDIR /root

RUN wget --no-check-certificate https://github.com/BoodskapPlatform/boodskap-platform/releases/download/v3.0.2/boodskap-3.0.2.tar.gz
RUN tar -xzvf /root/boodskap-3.0.2.tar.gz

RUN wget --no-check-certificate https://github.com/BoodskapPlatform/boodskap-platform/releases/download/v3.0.2/boodskap-patch-3.0.2-0003.tar.gz
RUN tar -xzvf /root/boodskap-patch-3.0.2-0003.tar.gz
RUN rm -rf /root/boodskap-*

WORKDIR /root/libs
RUN rm -f patch && rm -rf patches
RUN ln -s /root/patches/0003 patch

WORKDIR /

COPY root/ /root/
COPY start-boodskap.sh .

RUN chmod +x /start-boodskap.sh
RUN chmod +x /root/bin/*.sh

EXPOSE 18080 19090 2021 40000-60000 5555/udp

CMD ["/start-boodskap.sh"]

