FROM node:buster

WORKDIR /root/koinos-miner

RUN apt-get update -qy && \
    apt-get install -qy git cmake build-essential libssl-dev && \
    apt-get clean -qy

COPY . /root/koinos-miner

RUN npm install --unsafe-perm

#ENV privateKey

ENTRYPOINT [ "npm", "start", "--" ]

