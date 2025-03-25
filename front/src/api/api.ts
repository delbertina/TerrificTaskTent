import { Task } from "@/types/task";

const baseUrl = "http://localhost:3000";

const apiRoutes = {
    getTasks: () => '/task',
    deleteTask: (id: number | string) => `/task/${id}`,
  };

export const DeleteTask = async (id: number): Promise<Response> => {
  return await fetch(`${baseUrl}${apiRoutes.deleteTask(id)}`, {
    method: "DELETE",
  });
};

export const GetTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${baseUrl}${apiRoutes.getTasks()}`);
  return await response.json();
};