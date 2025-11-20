import { Injectable, inject } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Sort } from "../enums/sort";
import { Task } from "../interfaces/task";
import { TaskFormInterface } from "../interfaces/task-form.interface";

@Injectable({
    providedIn: "root",
})
export class TaskTrackerService {
    private http = inject(HttpClient);
    private apiUrl = "http://localhost:5000/api/tasks";
    constructor() {}

    getAllTasks({
        searchTerm = "",
        sort = Sort.Asc,
    }: {
        searchTerm?: string;
        sort?: Sort;
    }): Observable<Task[]> {
        return this.http.get<Task[]>(
            `${this.apiUrl}?term=${searchTerm}&sort=${sort}`
        );
    }

    getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }

    createTask(task: TaskFormInterface): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    updateTask({
        id,
        task,
    }: {
        id: number;
        task: TaskFormInterface;
    }): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, { ...task, id });
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
