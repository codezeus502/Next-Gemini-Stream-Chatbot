import { StreamingTextResponse, GoogleGenerativeAIStream } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest, res: NextResponse) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: 'Google API Key not set' },
      { status: 500 }
    );
  }
  const reqBody = await req.json();
  console.log(reqBody);
  const prompt = reqBody.data.prompt;
  try {
    const genAI = new GoogleGenerativeAI(String(apiKey));
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const streamingResponse = await model.generateContentStream(prompt);
    return new StreamingTextResponse(
      GoogleGenerativeAIStream(streamingResponse)
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
