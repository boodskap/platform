FROM node:6

EXPOSE 4201

WORKDIR /

COPY . admin-console/

RUN npm -s install

WORKDIR /admin-console

CMD ["npm", "start"]
