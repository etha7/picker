const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require("request")
const app = express();
const config = require("./src/config")
const fetch = require("node-fetch");
const {introspectSchema, makeRemoteExecutableSchema, makeExecutableSchema, mergeSchemas} = require('graphql-tools') 
const {ApolloServer, gql} = require('apollo-server-express')
const {transformSchemaFederation} = require('graphql-transform-federation')

const { resolvers } = require('./src/serverResolvers.js')
const { typeDefs } = require('./src/serverTypeDefs.js')

//Connect to postgres server
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

//GraphQL delegates requests from client to remote Yelp endpoint
const { HttpLink }  = require("apollo-link-http")
const link = new HttpLink({
  uri: "https://api.yelp.com/v3/graphql",
  headers: {
    'Authorization': config.auth  
  },
  fetch: fetch
})


setup_yelp_graphQL = async () => {
  var schema = await introspectSchema(link)
  const remoteSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });
  const serverSchema = makeExecutableSchema({
    resolvers, typeDefs
  })
  var schemas = [remoteSchema, serverSchema]
  schema = mergeSchemas({schemas})
  var config = {
    Query: {
    // Ensure the root queries of this schema show up the combined schema
      extend: true,
    }
  }
  federatedSchema = transformSchemaFederation(schema, config)

 const server = new ApolloServer({schema: federatedSchema, 
                                  context: (req, res)=>{
                                    return { req, res, pool };
                                  }
                                 })
 server.applyMiddleware({app})
 return server.graphqlPath
}
graphqlPath = setup_yelp_graphQL()

app.use(express.static(path.join(__dirname, 'build')))

port = process.env.PORT || 8080
server = app.listen(port, async () => {
  console.log(`Server ready at http://localhost:${port}${await graphqlPath}`)
});