FROM node:16.13.1-alpine3.14

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json .

RUN npm install -g nodemon ts-node

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]
