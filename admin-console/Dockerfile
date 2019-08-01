FROM node:6

EXPOSE 4201

WORKDIR /

COPY . ./admin-console/

WORKDIR /admin-console
RUN npm -s install

CMD ["npm", "start"]
