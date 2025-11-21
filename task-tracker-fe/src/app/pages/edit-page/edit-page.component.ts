import { ActivatedRoute, Router } from "@angular/router";
import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { Priority } from "../../enums/priority";
import { Status } from "../../enums/status";
import { SuccessResponse } from "../../interfaces/success-response.interface";
import { Task } from "../../interfaces/task";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskFormInterface } from "../../interfaces/task-form.interface";
import { TaskTrackerService } from "../../services/task-tracker.service";
import { TasksData } from "../../test.data";

@Component({
    selector: "app-edit-page",
    imports: [ReactiveFormsModule, TaskFormComponent, NgbAlertModule],
    templateUrl: "./edit-page.component.html",
    styleUrl: "./edit-page.component.css",
})
export class EditPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    task = signal<Task | null>(null);
    error = signal<string | null>(null);
    success = signal(false);

    private router = inject(Router);
    private taskService = inject(TaskTrackerService);

    constructor() {
        this.activatedRoute.params.subscribe((params) => {
            const id = +params["id"];

            this.taskService.getTaskById(id).subscribe((result) => {
                if (!result.isSuccess) {
                    this.error.set(result.errorMessage);
                    setTimeout(() => this.router.navigate([""]), 300);
                    return;
                }

                this.task.set((result as SuccessResponse<Task>).data);
            });
        });
    }

    onSubmitForm({ task, id }: { task: TaskFormInterface; id: number | null }) {
        if (id === null) {
            alert(`Error editing task. No ID found`);
            return;
        }
        this.taskService.updateTask({ id, task }).subscribe((result) => {
            if (!result.isSuccess) {
                this.error.set(result.errorMessage);
                return;
            }

            this.success.set(true);
        });
    }

    navigateHome() {
        this.router.navigate([""]);
    }

    deleteTask() {
        const stored_task = this.task();

        if (stored_task === null) {
            this.error.set("Task coudl not be deleted.");
            return;
        }

        this.taskService.deleteTask(stored_task.id).subscribe((result) => {
            if (!result.isSuccess) {
                this.error.set("Failed to delete the task");
                return;
            }

            this.router.navigate([""]);
        });
    }
}
