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
