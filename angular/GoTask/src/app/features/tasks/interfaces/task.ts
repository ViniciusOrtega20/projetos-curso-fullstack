import { IComment } from './comments';
import { TaskStatus } from '../type/task-status';

export interface ITask {
  id: string;
  name: string;
  description: string;
  comments: IComment[];
  status: TaskStatus;
}
