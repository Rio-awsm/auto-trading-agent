import { getTokenLLM } from "./getTokenLLM";
import { getTweets } from "./getTweet";
require('dotenv').config()

async function main(userId: string) {
    const newTweets = await getTweets(userId)
    console.log(newTweets);
    
}

// main("1354400126857605121")
async function fetchTokenLLM() {
    const response = await getTokenLLM(`I am selling all $FRIC. what do you think?
    EsP4kJfKUDLfX274WoBSiiEy74Sh4tZKUCDjfULHpump`)
    console.log(response);
}

fetchTokenLLM();