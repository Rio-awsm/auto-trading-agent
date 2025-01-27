import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getTokenLLM(contents: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        systemInstruction: "You are an AI agent that needs to tell me if this tweet is about buying a token. Return me either the address of the solana token, or return me null if you cant find a solana token address in this tweet. Only return if it says it is a bull post. The token address will be very visible in the tweet."
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain"
    };

    const chatSession = model.startChat({
        generationConfig,
        history: []  
    });

    const result = await chatSession.sendMessage(contents);
    const response = await result.response.text();
    
    return response || "null";
}

