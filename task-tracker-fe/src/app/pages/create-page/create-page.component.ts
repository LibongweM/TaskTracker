import { Component, ViewChild, inject, signal } from "@angular/core";
import { NgbAlert, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { Subject, debounceTime, tap } from "rxjs";

import { ErrorResponse } from "../../types/error-response";
import { Router } from "@angular/router";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskFormInterface } from "../../interfaces/task-form.interface";
import { TaskTrackerService } from "../../services/task-tracker.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-create-page",
    imports: [TaskFormComponent, NgbAlertModule],
    templateUrl: "./create-page.component.html",
    styleUrl: "./create-page.component.css",
})
export class CreatePageComponent {
    private taskService = inject(TaskTrackerService);
    error = signal<string | null>(null);
    wasSuccess = signal<boolean>(false);

    private router = inject(Router);

    onSubmitCreateForm({
        task,
    }: {
        task: TaskFormInterface;
        id: number | null;
    }) {
        this.taskService.createTask(task).subscribe((response) => {
            if (!response.isSuccess) {
                this.error.set(response.errorMessage);
                return;
            }

            this.wasSuccess.set(true);
        });
    }

    navigateHome() {
        this.wasSuccess.set(true);
        this.router.navigate([""]);
    }
}
