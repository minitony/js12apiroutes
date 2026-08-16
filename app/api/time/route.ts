import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date().toISOString();
  return NextResponse.json({ time: now });
}

export async function POST() {
  const now = new Date().toISOString();
  return NextResponse.json({ time: now });
}