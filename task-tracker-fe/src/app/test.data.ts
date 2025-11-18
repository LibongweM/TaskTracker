import { Task } from "./interfaces/task";

export const TasksData = [
    {
        id: 3,
        title: "Create Frontend",
        description: "React SPA with task list and forms",
        status: 0,
        priority: 1,
        dueDate: null,
        createdAt: "2025-11-18T19:09:50.473564Z",
    },
    {
        id: 1,
        title: "Design API",
        description: "Design RESTful API endpoints",
        status: 0,
        priority: 2,
        dueDate: "2025-11-21T19:09:50.47353Z",
        createdAt: "2025-11-18T19:09:50.473551Z",
    },
    {
        id: 2,
        title: "Implement Backend",
        description: "Build minimal APIs and EF Core models",
        status: 1,
        priority: 2,
        dueDate: "2025-11-25T19:09:50.473563Z",
        createdAt: "2025-11-18T19:09:50.473563Z",
    },
];

export interface TaskDummy {
    id: number;
    title: string;
    description: string;
}

export const TASKS_DUMMY: TaskDummy[] = [
    {
        id: 3,
        title: "Create Frontend",
        description: "React SPA with task list and forms",
    },
    {
        id: 1,
        title: "Design API",
        description: "Design RESTful API endpoints",
    },
    {
        id: 2,
        title: "Implement Backend",
        description: "Build minimal APIs and EF Core models",
    },
];
