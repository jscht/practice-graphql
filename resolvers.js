import { tweets, users } from "./localDB.js"
import fetch from "node-fetch"

export const resolvers = {
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
            const userChk = users.find(user => user.id === userId)
            if(!userChk) throw new Error("존재하지 않는 유저")
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