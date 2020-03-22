const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require("request")
const app = express();
const config = require("./src/config")
const fetch = require("node-fetch");
const {introspectSchema, makeRemoteExecutableSchema} = require('graphql-tools') 
const {ApolloServer, gql} = require('apollo-server-express')

//GraphQL delegates requests from client to remote Yelp endpoint

const { HttpLink }  = require("apollo-link-http")
const link = new HttpLink({
  uri: "https://api.yelp.com/v3/graphql",
  headers: {
    'Authorization': config.auth  
  },
  fetch: fetch
})
setup_graphQL = async () => {
  const schema = await introspectSchema(link)
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });

 const server = new ApolloServer({ schema: executableSchema})
 server.applyMiddleware({app})
 //app.use('/graphql', bodyParser.json(), new ApolloServer({ schema: executableSchema}))
}
setup_graphQL()
/*const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`
const resolvers = {
  Query: {
    books: () => books,
  },
};

(new ApolloServer({typeDefs, resolvers})).applyMiddleware({app})*/
app.use(express.static(path.join(__dirname, 'build')))

/*app.get('/businesses', function (req, res) {
 /*var params = Object.keys(req.query).map(k => {return {[k]: req.query[k] }} )
 var esc = encodeURIComponent
 var query = params.map( o => Object.keys(o).map(k => esc(k) + "=" + esc(o[k]))).join("&")
 var options = paramsToRequest(req, config.url+query)

 request.get(options, (error, response, body) => {
      res.send(body)
    })
 var query = {}
});*/

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
/*app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname+'/build/index.html'));
});*/


app.listen(process.env.PORT || 8080);