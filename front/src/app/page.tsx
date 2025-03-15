"use client";
import { Button } from "@/components/ui/button";
// Due to the time limit, I did not have time to correctly
// break out this component into multiple components
// to take advantage of server-side rendering
import { useEffect, useState } from "react";

// Due to the time limit, I had to cut corners
// Given more time, I would move these out into a file just for the types

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // Due to the time limit, I had to cut corners
  // The new and edit forms both use the same state
  // Given more time, would make theme their own components
  // and display in a modal or new route
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [editTaskStatus, setEditTaskStatus] = useState<TaskStatus>(
    TaskStatus.PENDING
  );
  const [editTaskId, setEditTaskId] = useState<number>(-1);

  const addTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskName,
          description: newTaskDescription,
        }),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTaskName("");
      setNewTaskDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const promptDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await fetch(`http://localhost:3000/task/${id}`, {
          method: "DELETE",
        });
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const startEditTask = (task: Task) => {
    setNewTaskName(task.title);
    setNewTaskDescription(task.description || "");
    setEditTaskStatus(task.status);
    setEditTaskId(task.id);
  };

  const cancelEditTask = () => {
    setNewTaskName("");
    setNewTaskDescription("");
    setEditTaskStatus(TaskStatus.PENDING);
    setEditTaskId(-1);
  };

  // I was right at the time limit when I remembered that the edit api method
  // was not returning the updated object. Given more time I would have fixed that
  // to cut down on API calls needed
  const editTask = async () => {
    try {
      await fetch(`http://localhost:3000/task/${editTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskName,
          description: newTaskDescription,
          status: editTaskStatus,
        }),
      });
      setNewTaskName("");
      setNewTaskDescription("");
      setEditTaskStatus(TaskStatus.PENDING);
      setEditTaskId(-1);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <div className="bg-gray-200 p-4 rounded-lg text-black">
          {/* If editing, display the editing form */}
          {/* Not ideal, but given the time limit I had to cut corners */}
          {editTaskId !== -1 && (
            <>
              <h2 className="text-2xl font-bold">Edit Task</h2>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Task name"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <select
                  value={editTaskStatus}
                  onChange={(e) =>
                    setEditTaskStatus(e.target.value as TaskStatus)
                  }
                >
                  <option value={TaskStatus.PENDING}>Pending</option>
                  <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                  <option value={TaskStatus.COMPLETED}>Completed</option>
                </select>
                <div className="flex flex-row gap-2">
                  {/* Given more time, I would have used buttons from a library to look nice */}
                  <Button
                    onClick={() => cancelEditTask()}
                    variant={"destructive"}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => editTask()} variant={"secondary"}>
                    Edit Task
                  </Button>
                </div>
              </div>
            </>
          )}
          {/* Displaying the new task form inline due to the time limit */}
          {/* Given more time, I would have used a modal or route */}
          {editTaskId === -1 && (
            <>
              <h2 className="text-2xl font-bold">New Task</h2>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Task name"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <Button onClick={() => addTask()}>Add Task</Button>
              </div>
            </>
          )}
        </div>
      </div>
      <h1 className="text-4xl font-bold">Tasks</h1>
      {tasks.length === 0 && <p>No tasks yet, add one!</p>}
      {/* Due to the time limit, could not add the filtering and sorting */}
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-200 p-4 rounded-lg text-black">
            {/* Given more time, I would have made these cards look nicer, */}
            {/* handle text overflow and added an actual icon library among many other things*/}
            <div className="flex flex-col gap-2 pb-4">
              <div className="flex flex-row">
                <p>({task.status} icon)</p>
                <h2 className="text-lg font-semibold mb-2 ">{task.title}</h2>
              </div>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                variant={"secondary"}
                onClick={() => startEditTask(task)}
              >
                Edit
              </Button>
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
  );
}
