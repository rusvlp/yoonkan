FROM node:latest
COPY ./client/package*.json .
RUN npm install
COPY ./client .
ENTRYPOINT ["npm","run","film"]
