FROM registry.access.redhat.com/ubi8/ubi:8.3
LABEL name="Dataset Dashbaord with Jupyterhub" \
      maintainer="edge@us.ibm.com" \
      vendor="IBM-Edge" \
      version="1.0.0" \
      release="1" \
      summary="Image for Dataset Dashbaord and Jupyterhub deployment" \
      description="Image for Dataset Dashbaord and Jupyterhub deployment"
COPY LICENSE /licenses/license.txt
WORKDIR /app
COPY . .
RUN yum update -y
RUN yum -y install yum-utils curl && \
    curl -sL https://rpm.nodesource.com/setup_14.x | bash - && \
    yum install -y nodejs && \
    curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
    yum install -y yarn && \
    yum install -y gcc-c++ make
RUN INSTALL_PKGS="python38 python38-devel python38-setuptools python38-pip nss_wrapper \
        httpd httpd-devel mod_ssl mod_auth_gssapi mod_ldap \
        mod_session atlas-devel gcc-gfortran libffi-devel libtool-ltdl enchant" && \
    yum -y module enable python38:3.8 httpd:2.4 && \
    yum -y --setopt=tsflags=nodocs install $INSTALL_PKGS && \
    rpm -V $INSTALL_PKGS && \
    # Remove redhat-logos-httpd (httpd dependency) to keep image size smaller.
    rpm -e --nodeps redhat-logos-httpd && \
    yum -y clean all --enablerepo='*'
RUN yum install -y bzip2 && \
    yum install -y sudo && \
    pip3 install supervisor && \
    yum install -y  curl wget nc git unzip net-tools fuse
RUN groupadd -g 900 sudo && useradd jupyter-user && \
    usermod -aG wheel,sudo jupyter-user && \
    echo "%sudo ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers
#RUN adduser jupyter-user
RUN chmod -R ug+rwx /app && chown -R jupyter-user:0 /app
RUN chmod -R ug+rwx /app && chown -R jupyter-user:0 /app && \
    mkdir /app/node_modules && chmod -R ug+rwx /app/node_modules && \
    mkdir /app/client/node_modules/ && chmod -R ug+rwx /app/client/node_modules/ && \
    chown -R jupyter-user:0 /app/node_modules && chown -R jupyter-user:0 /app/client/node_modules/ && \
    chown -R jupyter-user:0 /app/client
RUN wget https://github.com/kahing/goofys/releases/latest/download/goofys && \
    mv goofys /usr/local/bin/ && \
    chmod +x /usr/local/bin/goofys && \
    mkdir /home/jupyter-user/.aws && chown -R jupyter-user:jupyter-user /home/jupyter-user/.aws && \
    touch /home/jupyter-user/.aws/credentials 
COPY credentials  /home/jupyter-user/.aws/credentials
#COPY credentials  /home/jupyter-user/.aws/credentials

RUN mkdir /etc/jupyter && chmod -R ug+rwx /etc/jupyter 

#commented these two lines
#COPY jupyter_notebook_config.py /etc/jupyter/.
#COPY jupyterhub_config.py /etc/jupyter/.


RUN npm run build && npm run server-build && \
    chmod -R ug+rwx /app/dist && chown -R jupyter-user:0 /app/dist && chown -R jupyter-user:0 /app/client/build
EXPOSE 3012
RUN mkdir -p /opt/app-root/ && chgrp -R jupyter-user /opt/app-root/ && \
    pip3 install --upgrade pip && \
    npm install -g configurable-http-proxy && \
    pip3 install jupyterhub && \
    pip3 install jupyterlab==3
    #pip3 install notebook 

#change begins
COPY jupyter_notebook_config.py /home/jupyter-user/.jupyter/jupyter_notebook_config.py
COPY jupyterhub_config.py /home/jupyter-user/.jupyter/jupyterhub_config.py
RUN chmod -R ug+rwx /home/jupyter-user/.jupyter/jupyterhub_config.py && \
    chmod -R ug+rwx /home/jupyter-user/.jupyter/jupyter_notebook_config.py
#change ends

RUN mkdir -p /opt/notebooks && chgrp -R jupyter-user /opt/notebooks && \
    chmod -R g+rwx /opt/notebooks && chown jupyter-user:0 /opt/notebooks
EXPOSE 8000 
EXPOSE 8080
EXPOSE 8888

RUN echo -n 'q346c4T89vUD' | passwd --stdin jupyter-user
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY entrypoint.sh /opt/app-root/src/entrypoint.sh


#RUN chmod +x /etc/jupyter/jupyter_notebook_config.py && chmod +x /etc/jupyter/jupyterhub_config.py && \ 
RUN chmod +x /opt/app-root/src/entrypoint.sh && \
    chown jupyter-user:0 /opt/app-root/src/entrypoint.sh && \
    mkdir -p /var/log/supervisor && chgrp -R jupyter-user /var/log/supervisor && chgrp -R jupyter-user /etc/supervisor
ARG JUPYTER_PASSWORD
USER jupyter-user
ENTRYPOINT ["/opt/app-root/src/entrypoint.sh"]
CMD ["${JUPYTER_PASSWORD}"]
