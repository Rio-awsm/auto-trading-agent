import { getTweets } from "./getTweet";

async function main(userId: string) {
    const newTweets = await getTweets(userId)
    console.log(newTweets);
    
}

main("1347242445893902337")