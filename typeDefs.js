import { gql } from "apollo-server";

/**
 * schema definition language.
 * explain the data shape.
 * (``) must be used.
 */
export const typeDefs = gql`
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
        summary: String
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