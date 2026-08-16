'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TimeData {
  time: string;
}

export default function Home() {
  const [helloData, setHelloData] = useState<string>("");
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [todosData, setTodosData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch hello API
        const helloRes = await fetch("/api/hello");
        const helloText = await helloRes.text();
        setHelloData(helloText);

        // Fetch time API
        const timeRes = await fetch("/api/time");
        const timeJson = await timeRes.json();
        setTimeData(timeJson);

        // Fetch todos API
        const todosRes = await fetch("/api/todos");
        const todosJson = await todosRes.json();
        setTodosData(todosJson);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading API data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

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
            Next.js API Routes Learning App
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This app demonstrates Next.js API Routes with both GET and POST methods.
          </p>
        </div>

        <div className="w-full space-y-8 mt-8">
          {/* Hello API Section */}
          <section className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
              /api/hello (GET & POST)
            </h2>
            <div className="p-4 bg-white dark:bg-gray-800 rounded border">
              <p className="font-mono text-sm">Response: {helloData}</p>
            </div>
          </section>

          {/* Time API Section */}
          <section className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
              /api/time (GET & POST)
            </h2>
            <div className="p-4 bg-white dark:bg-gray-800 rounded border">
              <p className="font-mono text-sm">Current Time: {timeData?.time}</p>
            </div>
          </section>

          {/* Todos API Section */}
          <section className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
              /api/todos (GET & POST)
            </h2>
            <div className="p-4 bg-white dark:bg-gray-800 rounded border">
              <p className="font-mono text-sm mb-2">Todo List:</p>
              <ul className="space-y-2">
                {todosData.map((todo) => (
                  <li key={todo.id} className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full ${todo.completed ? 'bg-green-500' : 'bg-yellow-500'}`}
                    ></span>
                    <span className="font-mono text-sm">
                      {todo.id}. {todo.text} ({todo.completed ? '完了' : '未完了'})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
