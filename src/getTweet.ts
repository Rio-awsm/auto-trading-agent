import axios from "axios";

interface Tweet {
    contents: string;
    id: string;
    createdAt: string;
}

export async function getTweets(userId: string): Promise<Tweet[]> {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://twitter-api47.p.rapidapi.com/v2/user/tweets?userId=${userId}`,
        headers: {
            'x-rapidapi-host': 'twitter-api47.p.rapidapi.com',
            'x-rapidapi-key': "",
        },
    };

    try {
        const response = await axios.request(config);
        const tweetEntries = response.data.tweets || [];

        const tweets: Tweet[] = tweetEntries.map((entry: any) => {
            const tweet = entry.content?.itemContent?.tweet_results?.result?.legacy;
            return {
                contents: tweet?.full_text || "",
                id: tweet?.id_str || "",
                createdAt: tweet?.created_at || "",
            };
        });

        return tweets;
    } catch (error) {
        console.error("Error fetching tweets:", error);
        return [];
    }
}
