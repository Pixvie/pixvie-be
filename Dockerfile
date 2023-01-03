FROM node:18-alpine

WORKDIR /app
COPY . .
EXPOSE 3000
EXPOSE 80
EXPOSE 27017
RUN npm install
CMD ["npm", "run", "start"]
