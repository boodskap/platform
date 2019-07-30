FROM node:6

EXPOSE 4202

WORKDIR /

COPY . dashboard/

RUN npm -s install

WORKDIR /dashboard

CMD ["npm", "start"]
