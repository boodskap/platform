FROM boodskapiot/ubuntu:18.04.jdk13

MAINTAINER platform@boodskap.io

LABEL Remarks="Boodskap IoT Platform"

WORKDIR /

RUN wget --no-check-certificate https://archive.apache.org/dist/ignite/2.8.0/apache-ignite-2.8.0-bin.zip
RUN unzip apache-ignite-2.8.0-bin.zip
RUN mv apache-ignite-2.8.0-bin/* /root/
RUN rm -rf apache-ignite-2.8.0-bin*

WORKDIR /root

RUN wget --no-check-certificate https://github.com/BoodskapPlatform/boodskap-platform/releases/download/3.0.1/boodskap-all-libs-3.0.1.tar.gz
RUN tar -xzvf /root/boodskap-all-libs-3.0.1.tar.gz

RUN wget --no-check-certificate https://github.com/BoodskapPlatform/boodskap-platform/releases/download/3.0.1/boodskap-patch-3.0.1-10009.tar.gz
RUN tar -xzvf /root/boodskap-patch-3.0.1-10009.tar.gz
RUN rm -rf /root/boodskap-*

WORKDIR /

COPY root/ /root/
COPY start-boodskap.sh .

RUN chmod +x start-boodskap.sh

EXPOSE 18080 19090 2021 40000-60000

CMD ["/start-boodskap.sh"]

