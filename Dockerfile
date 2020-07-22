FROM boodskapiot/ubuntu:18.04.jdk13

MAINTAINER platform@boodskap.io

LABEL Remarks="Boodskap IoT Platform"

WORKDIR /

RUN wget --no-check-certificate https://archive.apache.org/dist/ignite/2.8.0/apache-ignite-2.8.0-bin.zip
RUN unzip apache-ignite-2.8.0-bin.zip
RUN mv apache-ignite-2.8.0-bin/* /root/
RUN rm -rf apache-ignite-2.8.0-bin*
RUN rm -rf /root/benchmarks && rm -rf /root/docs && rm -rf /root/examples && rm -rf /root/platforms

WORKDIR /root

RUN wget --no-check-certificate https://github.com/BoodskapPlatform/boodskap-platform/releases/download/v3.0.2/boodskap-ignite-3.0.2.tar.gz
RUN rm -rf /root/config/*
RUN tar -xzvf /root/boodskap-ignite-3.0.2.tar.gz
RUN rm -f /root/libs/boodskap/boodskap-*

RUN wget --no-check-certificate https://github.com/BoodskapPlatform/boodskap-platform/releases/download/v3.0.2/boodskap-patch-3.0.2-0003.tar.gz
RUN tar -xzvf /root/boodskap-patch-3.0.2-0003.tar.gz
RUN rm -rf /root/boodskap-*

WORKDIR /root/libs
RUN rm -f patch
RUN ln -s /root/patches/0003 patch

WORKDIR /

COPY root/ /root/
COPY start-boodskap.sh .

RUN chmod +x start-boodskap.sh

EXPOSE 18080 19090 2021 40000-60000 5555/udp

CMD ["/start-boodskap.sh"]

