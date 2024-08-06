import { NextResponse } from "next/server"
import OpenAI from "openai";

const systemPrompt = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. It is designed to help you with your tasks and answer your questions. The assistant is very good at chatting and can provide you with interesting and useful information. The assistant is very helpful and can help you with many things. The assistant is very friendly and can help you with anything you need. The assistant is very creative and can help you with many things. The assistant is very clever and can help you with many things. The assistant is very good at chatting and can provide you with interesting and useful information. The assistant is very helpful and can help you with many things. The assistant is very friendly and can help you with anything you need. The assistant is very creative and can help you with many things. The assistant is very clever and can help you with many things."
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


