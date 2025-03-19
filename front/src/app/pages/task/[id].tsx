"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';

const EditTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(TaskStatus.PENDING);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const id = router.query.id;

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
      // route back to list
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/task/${id}`);
        const data = await response.json();
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
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input disabled={isLoading} type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label>
        Description:
        <textarea disabled={isLoading} value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <label>
        Status:
        <select disabled={isLoading} value={status} onChange={(event) => setStatus(event.target.value as TaskStatus)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <Button disabled={isLoading} type="submit">Save Changes</Button>
    </form>
  );
};

export default EditTask;