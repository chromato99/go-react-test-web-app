FROM node:18-alpine AS build

WORKDIR /app
COPY ./app ./
RUN npm install
RUN npm run build

FROM golang:1.18.3-alpine
WORKDIR /server
COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY ./server ./server

COPY --from=build /app/build /app/build

RUN go build -o /run-server ./server/main.go

EXPOSE 8005

CMD [ "/run-server" ]