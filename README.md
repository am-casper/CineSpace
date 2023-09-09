
# Cinespace - Distraction free youtube alternative

Cinespace is a minimal alternative of youtube with less distraction. We won't show 
any other video recommendation while you are looking at your favorite videos. 


## Tech Stack

**Client:** Nextjs, MaterialIcons, TailwindCSS, Zustand, etc

**Server:** Golang, Deno, Nextjs API routes


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### for nextjs (frontend)
`MONGO_URL` - url of your mongodb

`DATA_API_KEY` - mongodb data api key


### for server (deno backend)
`BASE_URI` - `https://ap-south-1.aws.data.mongodb-api.com/app/$YOUR_APP_NAME/endpoint/data/v1/action`

`DATA_SOURCE` - cluster name

`DATABASE` - database name

`COLLECTION` - collection name







## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory and setup .env

```bash
  cd my-project
```

Install frontend dependencies

```bash
  cd frontend
  npm install
```

Start the server

```bash
  npm run start
```

Run the deno server

```
  cd server
  deno run  -A server.ts
```

