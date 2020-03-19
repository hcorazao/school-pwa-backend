# SCHOOL PWA BACKEND
SCHOOL PWA BACKEND system using Graphql Node.js, Express and MongoDB

GraphQL developed by Facebook in 2012 and publicly available in 2015. GraphQL is alternative of REST full web service. It allows clients Query with flexible data structure which are required for client. It also support the data manipulation and modification functionlaity named `mutation` Like rest api. GraphQL provide official middleware for express server named `express-graphql`.


# Installation instructions

1. clone the repository `git clone `
2. For npm run command `npm install`

# Project Structure
```
EXPORESS-GRAPHQL-WITH-MONGOOSE
|--------------
|--| config
|----| database.js (database configuration file)
|--|config (Env connection)
|--| src (Project soruce file directory)
|----| graphql (All graphql related file directory)
|------| mutations (All graphql mutation related file directory)
|--------| <Type Wise Mutation>.js (Graphql type wise mutation files)
|--------| index.js (export all mutation to other module by this file)
|------| queries (All GraphQL Query related files)
|--------| <GraphQL type file>.js (Individual Graphql type related file)
|--------| index.js (GraphQL Root Type file)
|----| models (All mongoose ODM related file)
|------| <mongoose model>.js (mongoose model and schema related file)
|----| schema.js (GraphQL Schema building file)
|--| .env (node js environment variable related file)
|--| index.js (main file for run web server and connection mongoose create GraphQL Endpoint)
```
# Prerequsite and configurations
1. Install the `mongodb` and `Studio 3T` non commercial version.
2. Create Database to mongodb named `graphqltest`
3. Add username and password to mongodb and provide all permission to database.
4. Grant all permission to user.
5. Change the `.env` file for database configuration
6. Run the command `npm start`

```
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_USER=<username>
DATABASE_PASS=<password>
DATABASE_NAME=graphqltest
```

# Introductions and knowladgebase

1. GraphQL
2. express JS
3. dotenv
4. mongoose
6. Graphqli
7. nodemon

### What is graphql

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools[!alt text](https://graphql.org/).

### What is graphql-express

GraphQL HTTP server with any HTTP web framework that supports connect styled middleware, including Connect itself, Express and Restify.

### What is Mongoose

Mongoose is an object data modeling (ODM) library that provides a rigorous modeling environment for your data, enforcing structure as needed while still maintaining the flexibility that makes MongoDB powerful.

### Express JS

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.







