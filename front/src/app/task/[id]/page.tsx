"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TaskStatus } from "@/types/task";
import { Button } from "@/components/ui/button";
import { CircleDashed, CircleEllipsis, CircleCheckBig } from "lucide-react";
import { z } from "zod";
import { AddTask, getTask } from "@/api/api";

const taskFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title must be at least 1 character long")
    .max(50, "Title must be no more than 50 characters long"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description must be at least 1 character long"),
  status: z.nativeEnum(TaskStatus, {
    required_error: "Status is required",
  }),
});

const EditTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(TaskStatus.PENDING);
  const [isLoading, setIsLoading] = useState(false);
  const id = parseInt(useParams().id + "");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!id || id < 1) {
      addTask();
    } else {
      editTask();
    }
  };

  const completeSubmission = () => {
    setTitle("");
    setDescription("");
    setStatus(TaskStatus.PENDING);
    setIsLoading(false);
    router.push("/");
  };

  const editTask = async () => {
    try {
      await EditTask({ id, title, description, status });
      completeSubmission();
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    try {
      await AddTask({id: 0, title, description, status });
      completeSubmission();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTask(id);
        console.log(data);
        setTitle(data.title);
        setDescription(data.description??"");
        setStatus(data.status);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (id > 0) {
      fetchTask();
    }
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
            <option value="pending">
              <div>
                <CircleDashed />
                Pending
              </div>
            </option>
            <option value="in-progress">
              <CircleEllipsis /> In Progress
            </option>
            <option value="completed">
              <CircleCheckBig /> Completed
            </option>
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
