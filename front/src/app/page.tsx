"use client";
import { DeleteTask, GetTasks } from "@/api/api";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading_spinner";
import { Task, TaskStatus } from "@/types/task";
import { CircleCheckBig, CircleDashed, CircleEllipsis } from "lucide-react";
import Link from "next/link";
// Due to the time limit, I did not have time to correctly
// break out this component into multiple components
// to take advantage of server-side rendering
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const promptDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await DeleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await GetTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Tasks</h1>
      <Link href={`/task/${0}`}>
        <Button variant={"default"}>Add</Button>
      </Link>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div>
          {tasks.length === 0 && <p>No tasks yet, add one!</p>}
          {/* Due to the time limit, could not add the filtering and sorting */}
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-200 p-4 rounded-lg text-black"
              >
                {/* Given more time, I would have made these cards look nicer, */}
                {/* handle text overflow and added an actual icon library among many other things*/}
                <div className="flex flex-col gap-2 pb-4">
                  <div className="flex flex-row">
                    {task.status === TaskStatus.PENDING && (
                      <CircleDashed className="mr-2" />
                    )}
                    {task.status === TaskStatus.IN_PROGRESS && (
                      <CircleEllipsis className="mr-2" />
                    )}
                    {task.status === TaskStatus.COMPLETED && (
                      <CircleCheckBig className="mr-2" />
                    )}
                    <h2 className="text-lg font-semibold mb-2 ">
                      {task.title}
                    </h2>
                  </div>
                  <p className="text-gray-600">{task.description}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <Link href={`/task/${task.id}`}>
                    <Button variant={"secondary"}>Edit</Button>
                  </Link>
                  <Button
                    variant={"destructive"}
                    onClick={() => promptDelete(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
