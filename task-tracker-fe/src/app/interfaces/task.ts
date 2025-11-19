import { Priority } from "../enums/priority";
import { Status } from "../enums/status";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: string | null;
    createdAt: string;
}
