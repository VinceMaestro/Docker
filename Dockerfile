FROM node:boron

WORKDIR /Users/Mads/prog/git/perso/Docker/app

COPY package.json ./

RUN npm install

COPY src/ .

EXPOSE 8080

CMD [ "node", "vote" ]
