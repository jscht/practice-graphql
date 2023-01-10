import { ApolloServer, gql } from "apollo-server";

const tweets = [
    {
        id: "1",
        message: "first tweet"
    },
    {
        id: "2",
        message: "second tweet"
    },
    {
        id: "3",
        message: "third tweet"
    }
]

/**
 * schema definition language.
 * explain the data shape.
 * (``) must be used.
 */
const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        firstName: String!
        lastName: String
    }
    type Tweet {
        id: ID!
        message: String!
        author: User
    }
    type Query {
        allTweet: [Tweet!]!
        tweet(id: ID!): Tweet
    }
    type Mutation {
        postTweet(message: String!, userID: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`

const resolvers = {
    Query: {
        allTweet() { return tweets },
        tweet(root, args) {
            console.log(root, args)
            return tweets.find(tweet => tweet.id === args.id)
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen()
.then(({url}) => {
    console.log(`running on ${url}`)
})
.catch((error) => console.log(error))