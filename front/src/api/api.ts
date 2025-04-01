import { Task } from "@/types/task";

const baseUrl = "http://localhost:3000";

const apiRoutes = {
    getTasks: () => '/task',
    getTask: (id: number | string) => `/task/${id}`,
    addTask: () => '/task',
    editTask: (id: number | string) => `/task/${id}`,
    deleteTask: (id: number | string) => `/task/${id}`,
  };

export const DeleteTask = async (id: number): Promise<Response> => {
  return await fetch(`${baseUrl}${apiRoutes.deleteTask(id)}`, {
    method: "DELETE",
  });
};

export const AddTask = async (task: Task): Promise<Response> => {
  return await fetch(`${baseUrl}${apiRoutes.getTasks()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const EditTask = async (task: Task): Promise<Response> => {
  return await fetch(`${baseUrl}${apiRoutes.editTask(task.id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const getTask = async (id: number): Promise<Task> => {
  const response = await fetch(`${baseUrl}${apiRoutes.getTask(id)}`);
  return await response.json();
};

export const GetTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${baseUrl}${apiRoutes.getTasks()}`);
  return await response.json();
};