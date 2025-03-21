"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TaskStatus } from "@/types/task";
import { Button } from "@/components/ui/button";

const EditTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(TaskStatus.PENDING);
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams().id;
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    editTask();
  };

  const editTask = async () => {
    try {
      await fetch(`http://localhost:3000/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status,
        }),
      });
      setTitle("");
      setDescription("");
      setStatus(TaskStatus.PENDING);
      setIsLoading(false);
      // route back to list
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/task/${id}`);
        const data = await response.json();
        console.log(data);
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [id]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title:
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            disabled={isLoading}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description:
          </label>
          <textarea
            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            disabled={isLoading}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status:
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            disabled={isLoading}
            value={status}
            onChange={(event) => setStatus(event.target.value as TaskStatus)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <Button disabled={isLoading} type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditTask;
