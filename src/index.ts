import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getTokenLLM } from "./getTokenLLM";
import { getTweets } from "./getTweet";
import { swap } from "./swap";
require('dotenv').config()

const SOL_AMOUNT = 0.001 * LAMPORTS_PER_SOL;

async function main(userId: string) {
    const newTweets = await getTweets(userId)
    console.log(newTweets);
    for (let tweet of newTweets) {
        const tokenAddress = await getTokenLLM(tweet.contents)
        console.log(tokenAddress);
        if (tokenAddress !== "null") {
            console.log(`trying to execute tweet => ${tweet.contents}`)
            await swap(tokenAddress, SOL_AMOUNT);
        }
    }
}


main("1821987239645057025")
