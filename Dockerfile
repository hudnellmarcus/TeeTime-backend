# syntax=docker/dockerfile:1

# ORIGINAL DOCKERFILE SETUP FOR BUILDING IMAGE
###############################################
# FROM node:16

# WORKDIR /app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# # If you are building your code for production
# # RUN npm ci --only=production
# RUN npm ci --only=production

# # Bundle app source
# COPY . . 

# ENV NODE_ENV=production


# CMD [ "node", "server.js"]

############################################
##### MULTI-STAGE DOCKERFILE REFACTOR
##########################################
FROM node:16 as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as test
RUN npm ci
COPY . .
# ALLOWS YOU TO BUILD AND RUN TESTS WITH SINGLE COMMAND
RUN npm run test

FROM base as prod
RUN npm ci --production
COPY . .
CMD [ "node", "server.js" ]

#### JENKINS ######################
FROM jenkins/jenkins:2.346.2-jdk11
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
RUN jenkins-plugin-cli --plugins "blueocean:1.25.5 docker-workflow:1.28"