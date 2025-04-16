FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#Need to install the dependencies for python
RUN apk add --no-cache python3 py3-pip
RUN pip3 install --no-cache --break-system-packages -r docxBuilder/requirements.txt

EXPOSE 3000

CMD ["npm", "run", "dev"]