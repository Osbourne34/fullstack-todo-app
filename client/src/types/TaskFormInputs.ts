import { Dayjs } from 'dayjs';

export interface TaskFormInputs {
    title: string;
    category: string;
    priority: string;
    deadline: Dayjs | null;
}
