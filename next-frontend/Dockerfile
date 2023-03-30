FROM node:14-alpine
WORKDIR /seller-helper-frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]