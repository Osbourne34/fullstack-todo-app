import { Category } from './Category';
import { Priority } from './Priority';

export interface Task {
    title: string;
    _id: string;
    owner: string;
    deadline: string;
    category: Category | null;
    priority: Priority | null;
    completed: boolean;
}
