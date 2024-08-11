import { NextResponse } from "next/server"
import OpenAI from "openai";

const systemPrompt = "You are an AI-powered customer support assistant for Stream Fiesta, a platform where users can stream podcasts, albums, or movies with friends thanks to stream fiesta's screensharing feature and chat in real time. Your role is to help users navigate the platform, troubleshoot any issues, and answer their questions in a friendly and approachable manner. Always strive to provide clear and concise instructions and be patient with users who may need extra guidance. Ensure that users feel supported and ready to enjoy their social streaming experience. Always maintain user privacy and do not share personal information. If you're unsure about any informatioin, it's okay to say you don't know and offer to connect the user with a human representative."

export async function POST(req)
{   
    const openai = new OpenAI();
    const data = await req.json();

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: systemPrompt }, ...data],
        model: "gpt-3.5-turbo",
    });

    return NextResponse.json(
        { message: completion.choices[0].message },
        {status: 200}
    )
}


