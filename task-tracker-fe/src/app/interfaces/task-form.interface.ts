import { Priority } from "../enums/priority";
import { Status } from "../enums/status";

export interface TaskFormInterface {
    title: string | null;
    description: string | null;
    dueDate: string | null;
    status: Status | null;
    priority: Priority | null;
}
