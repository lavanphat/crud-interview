# CRUD Interview

The project for CRUD interview to implement a **REST API** using [NestJS](https://docs.nestjs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client).

## Getting started

### 1. Create file env

Create file environment

```
cp .env.template .env
```

### 1. Install dependencies

Install npm dependencies:

```
yarn install
```

### 2. Create the database

Run the following command to create your database. This also creates the `User` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
yarn migrate
```

### 3. Start the REST API server

```
yarn dev
```

The server is now running on `http://localhost:5000`. You can now run Swagger, e.g. [`http://localhost:5000`](http://localhost:5000).
