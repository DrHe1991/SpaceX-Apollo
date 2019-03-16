const express = require("express");
const { ApolloServer} = require("apollo-server-express");
const cors = require("cors")
const path = require("path")

// Construct a schema, using GraphQL schema language
const typeDefs = require('./graphql/schema')

// Provide resolver functions for your schema fields
const resolvers = require("./graphql/resolvers")

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: { endpoint: "/graphql", settings: { "editor.theme": "dark" } }
});

const app = express();
app.use(cors())
server.applyMiddleware({ app });

app.use(express.static('public'))

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'))
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);
