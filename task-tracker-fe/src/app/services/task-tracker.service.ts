import { Injectable, inject } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";

import { ErrorResponse } from "../types/error-response";
import { HttpClient } from "@angular/common/http";
import { Result } from "../types/result";
import { Sort } from "../enums/sort";
import { SuccessResponse } from "../interfaces/success-response.interface";
import { Task } from "../interfaces/task";
import { TaskFormInterface } from "../interfaces/task-form.interface";

@Injectable({
    providedIn: "root",
})
export class TaskTrackerService {
    private http = inject(HttpClient);
    // private apiUrl = "http://localhost:5000/api/tasks";
    private apiUrl = process.env["API_BASE_URL"] as string;
    constructor() {}

    getAllTasks({
        searchTerm = "",
        sort = Sort.Asc,
    }: {
        searchTerm?: string;
        sort?: Sort;
    }): Observable<Result<Task[]>> {
        return this.http
            .get<Result<Task[]>>(
                `${this.apiUrl}?term=${searchTerm}&sort=${sort}`
            )
            .pipe(
                catchError((err) =>
                    of({
                        isSuccess: false,
                        errorMessage: "Failed to load tasks",
                    } as ErrorResponse)
                )
            );
    }

    getTaskById(id: number): Observable<Result<Task>> {
        return this.http.get<Result<Task>>(`${this.apiUrl}/${id}`).pipe(
            catchError((err) =>
                of({
                    isSuccess: false,
                    errorMessage: "Server error while fetching task",
                } as ErrorResponse)
            )
        );
    }

    createTask(task: TaskFormInterface): Observable<Result<Task>> {
        return this.http.post<Result<Task>>(this.apiUrl, task).pipe(
            catchError((err) =>
                of({
                    isSuccess: false,
                    errorMessage: "Failed to create task",
                })
            )
        );
    }

    updateTask({
        id,
        task,
    }: {
        id: number;
        task: TaskFormInterface;
    }): Observable<Result<Task>> {
        return this.http
            .put<Result<Task>>(`${this.apiUrl}/${id}`, { ...task, id })
            .pipe(
                catchError((err) =>
                    of({
                        isSuccess: false,
                        errorMessage: "Failed to update task",
                    } as ErrorResponse)
                )
            );
    }

    deleteTask(id: number): Observable<Result<boolean>> {
        return this.http.delete<Result<boolean>>(`${this.apiUrl}/${id}`).pipe(
            catchError((err) =>
                of({
                    isSuccess: false,
                    errorMessage: "Failed to delete task",
                } as ErrorResponse)
            )
        );
    }
}
