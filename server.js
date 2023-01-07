import { ApolloServer, gql } from "apollo-server";

/**
 * schema definition language.
 * explain the data shape.
 * (``) must be used.
 */
const typeDefs = gql`
    type User {
        id: ID
        username: String
    }
    type Tweet {
        id: ID
        message: String
        author: User
    }
    type Query {
        allTweet: [Tweet]
        tweet(id: ID): Tweet
    }
    type Mutation {
        postTweet(message: String, userID: ID): Tweet
        deleteTweet(id: ID): Boolean
    }
`
const server = new ApolloServer({typeDefs})

server.listen()
.then(({url}) => {
    console.log(`running on ${url}`)
})
.catch((error) => console.log(error))