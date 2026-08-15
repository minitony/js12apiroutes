'use client';
import Image from "next/image";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Todo {
  id: number;
  text: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then(response => response.json())
      .then((data: Todo[]) => {
        setTodos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() === "") return;

    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodoText })
    })
      .then(response => response.json())
      .then((data: Todo[]) => {
        setTodos(data);
        setNewTodoText("");
      });
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              page.tsx
            </code>
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>
            or the
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <div className="max-w-md mx-auto">
            <ul className="list-none p-4">
              {loading ? (
                <p>Loading todos...</p>
              ) : (
                todos.length > 0 ? (
                  todos.map(todo => (
                    <li key={todo.id} className="text-gray-800 mb-2">
                      {todo.text}
                    </li>
                  ))
                ) : (
                  <p>No todos yet.</p>
                )
              )}
            </ul>
            <form className="mt-8" onSubmit={handleSubmit}>
              <input
                type="text"
                value={newTodoText}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodoText(e.target.value)}
                placeholder="Add new todo"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white px-4 rounded"
              >
                Add Todo
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
