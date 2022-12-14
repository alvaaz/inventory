# Inventory

NextJS app to help you manage your inventory. This is a exercise to learn new web technologies, don't judge my spaghetti code.

## Installation

This project has 2 parts. The first is the inventory server and the second is the inventory client. The server is a GraphQL API that is written in JS using, [Redis](https://redis.io/), [Postgres](https://www.postgresql.org/). The client is a web application that is written in React using NextJS.

To simplify the installation process, we have created a docker-compose file that will install all the dependencies for you. To install the project, you will need to have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.

### Server

To start the server you will need to run 2 process, one for the database and other for the server.

First, move to the `api` directory.

To start the database, run the following command:

```bash
  docker-compose up
```

Then, to start the server, run the following command:

```bash
  npm install
  npm run start
```

This will start the server and the database. You can access the GraphQL playground at `http://localhost:4000/graphql`.

### Client

To run the client, you will need to have [NodeJS](https://nodejs.org/en/) installed. Once you have NodeJS installed, you'll need move into the `app` directory and run the following command:

```bash
npm install
npm run dev
```

This will start the client. You can access the client at `http://localhost:3000`.
