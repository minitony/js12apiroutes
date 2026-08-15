import { NextRequest, NextResponse } from 'next/server';

let todos = [
  { id: 1, text: 'Learn Next.js' },
  { id: 2, text: 'Build an API' }
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTodo = { id: todos.length + 1, text: body.text };
  todos.push(newTodo);
  return NextResponse.json(todos);
}