FROM node:16.13.1-alpine3.14

WORKDIR /home/app

RUN npm install -g ts-node nodemon

COPY package*.json .

RUN npm install --production

COPY . .

CMD [ "npm", "run", "start" ]
