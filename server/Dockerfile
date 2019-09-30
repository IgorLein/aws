FROM node:10

ENV AWS_ACCESS_KEY_ID AKIAQPN3Y2R5BTBZLO4K
ENV AWS_SECRET_ACCESS_KEY 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

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD npm start