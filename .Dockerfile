FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime

# Installs dependencies and other additional packages
RUN apt-get update && apt-get install -qqy git unzip libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libonig-dev \
    libicu-dev \
    default-mysql-client \    
    libaio1 wget yarn vim cron dos2unix \
    && apt-get clean autoclean \
    && apt-get autoremove --yes \
    &&  rm -rf /var/lib/{apt,dpkg,cache,log}/ 


RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/America/America/Sao_Paulo /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

ENV TZ="America/Sao_Paulo"

# ORACLE oci 
RUN mkdir /opt/oracle \
    && cd /opt/oracle     

ADD /oracle_install/instantclient-basic-linux.x64-12.1.0.2.0.zip /opt/oracle
ADD /oracle_install/instantclient-sdk-linux.x64-12.1.0.2.0.zip /opt/oracle

# Install Oracle Instantclient
RUN  unzip /opt/oracle/instantclient-basic-linux.x64-12.1.0.2.0.zip -d /opt/oracle \
    && unzip /opt/oracle/instantclient-sdk-linux.x64-12.1.0.2.0.zip -d /opt/oracle \
    && ln -s /opt/oracle/instantclient_12_1/libclntsh.so.12.1 /opt/oracle/instantclient_12_1/libclntsh.so \
    && ln -s /opt/oracle/instantclient_12_1/libclntshcore.so.12.1 /opt/oracle/instantclient_12_1/libclntshcore.so \
    && ln -s /opt/oracle/instantclient_12_1/libocci.so.12.1 /opt/oracle/instantclient_12_1/libocci.so \
    && rm -rf /opt/oracle/*.zip

ENV LD_LIBRARY_PATH  /opt/oracle/instantclient_12_1:${LD_LIBRARY_PATH}

RUN mkdir -p /opt/oracle/instantclient_12_1/network/admin
COPY /configs/tnsnames.ora /opt/oracle/instantclient_12_1/network/admin

ENV TNS_ADMIN=/opt/oracle/instantclient_12_1/network/admin
ENV ORACLE_HOME=/opt/oracle/instantclient_12_1


WORKDIR /var/www/html 
COPY ./deploy ./
COPY ./deploy/wwwroot/Image ./Image
ENTRYPOINT ["dotnet", "AgendaEventos.dll"]