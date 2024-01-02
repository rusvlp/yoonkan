#!/bin/bash

#порт
sudo firewall-cmd --permanent --add-port=4445/tcp
sudo firewall-cmd --reload

#поставить докер
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

#запустить
sudo systemctl enable docker
sudo systemctl start docker

#контейнер
sudo docker build -t films .

