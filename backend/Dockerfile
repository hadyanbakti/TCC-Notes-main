FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production 
# --production = tanpa devDepedencies
COPY . .
EXPOSE 7000
CMD ["node", "index.js"]
