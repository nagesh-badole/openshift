#!/bin/bash

#USER=${1:-"student"}
#PASSWORD=${2:-"Docker@123"}

#USER="student"
#PASSWORD="Docker@123"

#echo "user name is ${USER}"
#sudo useradd ${USER}
#sudo usermod -aG wheel,sudo,jupyter-user ${USER}
#echo "%sudo ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers
#echo -n "${PASSWORD}" | passwd --stdin jupyter-user
#chown -R jupyter-user:jupyter-user /app/.config

set -e
# Start supervisord and services
exec /usr/local/bin/supervisord --nodaemon -c /etc/supervisor/conf.d/supervisord.conf


