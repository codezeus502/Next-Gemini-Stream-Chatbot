import { StreamingTextResponse, GoogleGenerativeAIStream } from 'ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: 'Google API Key not set' },
      { status: 500 }
    );
  }

  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const prompt = reqBody.data.prompt;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });
    const streamingResponse: any = await model.generateContentStream(prompt);

    const reader = streamingResponse.getReader();
    const { value, done } = await reader.read();
    const textDecoder = new TextDecoder();
    const decodedValue = textDecoder.decode(value);

    return NextResponse.json({ data: decodedValue }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
