import { NextResponse } from 'next/server';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: 1, text: 'Next.jsを学ぶ', completed: false },
  { id: 2, text: 'API Routesを理解する', completed: false },
  { id: 3, text: 'Todoアプリを作る', completed: true },
];

let nextId = 4;

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'text is required and must be a string' },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: nextId++,
      text,
      completed: false,
    };

    todos.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }
}