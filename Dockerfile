# Use the official Go image as the base image
FROM golang:1.22.0-alpine AS cinespace-go

# Set the working directory inside the container
WORKDIR /app/go
# Copy the Go module files
COPY backend/go.mod backend/go.sum ./

# Download and install the Go dependencies
RUN go mod download

# Copy the rest of the application source code
COPY backend/ .

# Build the Go application
RUN go build -o main .

# Expose the port that the application listens on
EXPOSE 10000
ENTRYPOINT [ "go" ]
# Set the command to run the executable
CMD ["run", "main.go"]

FROM denoland/deno:latest AS cinespace-deno

WORKDIR /app/deno

COPY server/ ./

EXPOSE 8000

CMD ["run","--watch","--allow-net","--allow-read","--allow-env","server.ts"]

FROM node:18-alpine AS cinespace-nextjs

WORKDIR /app/nextjs
COPY frontend/package.json ./

RUN npm i

COPY frontend/ ./

EXPOSE 3000

CMD ["npm", "run", "dev"]

