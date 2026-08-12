interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: 1, title: "Next.js を学ぶ", completed: true },
  { id: 2, title: "API Routes を理解する", completed: false },
  { id: 3, title: "Todo アプリを作る", completed: false },
];

let nextId = 4;

export async function GET() {
  return Response.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTodo: Todo = {
    id: nextId++,
    title: body.title || "無題のタスク",
    completed: false,
  };
  todos.push(newTodo);
  return Response.json(newTodo, { status: 201 });
}