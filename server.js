import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch"

const tweets = [
    {
        id: "1",
        message: "first tweet",
        userId: "2"
    },
    {
        id: "2",
        message: "second tweet",
        userId: "1"
    },
    {
        id: "3",
        message: "third tweet",
        userId: "1"
    }
]

const users = [
    {
        id: "1",
        // username: null,
        firstName: "as",
        lastName: "d"
    },
    {
        id: "2",
        username: null,
        firstName: "qw",
        lastName: "e"
    },
]

/**
 * schema definition language.
 * explain the data shape.
 * (``) must be used.
 */
const typeDefs = gql`
    type Movie {
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String!
        description_full: String!
        synopsis: String
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
    }
    type User {
        id: ID!
        username: String!
        firstName: String!
        lastName: String!
    }
    type Tweet {
        id: ID!
        message: String!
        author: User
    }
    type Query {
        allMovie: [Movie!]!
        movie(id: ID!): Movie
        allTweet: [Tweet!]!
        tweet(id: ID!): Tweet
        allUser: [User!]!
    }
    type Mutation {
        postTweet(message: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`

const resolvers = {
    Query: {
        allMovie() {
            console.log("allMovie info")
            return fetch("https://yts.mx/api/v2/list_movies.json")
            .then(res => res.json())
            .then(res => res.data.movies)
        },
        movie(_, {id}) {
            console.log(id, "movie info")
            if(!id) throw new Error("missing argument 'id'")
            return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            .then(res => res.json())
            .then(res => res.data.movie)
        },
        allTweet() { return tweets },
        tweet(root, args) {
            return tweets.find(tweet => tweet.id === args.id)
        },
        allUser() { 
            console.log("allUser called")
            return users 
        }
    },
    Mutation: {
        postTweet(_, {message, userId}) {
            if(!userCheck(userId)) throw new Error("존재하지 않는 유저")
            const newTweet = {
                id: tweets.length + 1,
                message,
                userId
            }
            tweets.push(newTweet)
            return newTweet
        },
        deleteTweet(_, {id}) {
            const findTweet = tweets.find(tweet => tweet.id === id)
            if(!findTweet) return false
            tweets.forEach((tw, idx) => {
                if(tw.id === id) tweets.splice(idx, 1)
            });
            return true
        }
    },
    User: {
        username(root, args) {
            console.log("username called")
            return `${root.firstName}${root.lastName}`
        }
    },
    Tweet: {
        author({userId}) {
            return users.find(user => user.id === userId)
        }
    }
}

function userCheck(userId) {
    return users.find(user => user.id === userId)
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen()
.then(({url}) => {
    console.log(`running on ${url}`)
})
.catch((error) => console.log(error))
