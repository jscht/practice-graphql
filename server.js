import { ApolloServer, gql } from "apollo-server";

const server = new ApolloServer({})

server.listen().then(({url}) => {
    console.log(`running on ${url} port`)
    // Error: Apollo Server requires either an existing schema, modules or typeDefs
})