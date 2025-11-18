export interface Task {
    id: number;
    title: string;
    description: string;
    status: "New" | "InProgress" | "Closed";
    priority: "Low" | "High" | "Normal";
    dueDate: Date | null;
    createdAt: Date;
}
