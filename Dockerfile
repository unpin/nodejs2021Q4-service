FROM node:16.13.1-alpine3.14

RUN mkdir -p /home/app

WORKDIR /home/app

RUN npm install -g @nestjs/cli typeorm ts-node-dev

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:devs"]
