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