import { Subtask } from './subtask.model';

export interface Task {
  id: string;
  title: string;
  status: string;
  description: string;
  subtasks: Subtask[];
}
