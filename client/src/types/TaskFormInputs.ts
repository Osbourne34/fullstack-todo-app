import { Dayjs } from 'dayjs';

export interface TaskFormInputs {
    title: string;
    category: string | null;
    priority: string | null;
    deadline: Dayjs | null;
}
