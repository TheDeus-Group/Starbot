FROM node:latest

COPY --chown=node . /home/node/starbot

USER node
WORKDIR /home/node/starbot

RUN yarn install

CMD [ "node", "src/index.js" ]