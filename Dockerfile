FROM node:8.4.0
WORKDIR /home
COPY package.json /home
RUN npm install
COPY . /home
CMD ["npm", "start"]
EXPOSE 4000
