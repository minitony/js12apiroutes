import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello API' });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ message: 'Hello API', received: data }, { status: 201 });
}