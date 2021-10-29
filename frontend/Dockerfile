FROM node:14-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin :$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
RUN npm i
CMD ["npm", "start"]