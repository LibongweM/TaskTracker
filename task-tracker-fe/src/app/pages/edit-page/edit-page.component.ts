import { ActivatedRoute, Router } from "@angular/router";
import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { Priority } from "../../enums/priority";
import { Status } from "../../enums/status";
import { Task } from "../../interfaces/task";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskFormInterface } from "../../interfaces/task-form.interface";
import { TaskTrackerService } from "../../services/task-tracker.service";
import { TasksData } from "../../test.data";

@Component({
    selector: "app-edit-page",
    imports: [ReactiveFormsModule, TaskFormComponent],
    templateUrl: "./edit-page.component.html",
    styleUrl: "./edit-page.component.css",
})
export class EditPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    task = signal<Task | null>(null);
    private router = inject(Router);
    private taskService = inject(TaskTrackerService);

    constructor() {
        this.activatedRoute.params.subscribe((params) => {
            const id = +params["id"];

            this.taskService.getTaskById(id).subscribe((t) => {
                this.task.set(t);
            });
        });
    }

    onSubmitForm({ task, id }: { task: TaskFormInterface; id: number | null }) {
        if (id === null) {
            alert(`Error editing task. No ID found`);
            return;
        }
        this.taskService
            .updateTask({ id, task })
            .subscribe((r) => console.log(r));
    }

    deleteTask() {
        const stored_task = this.task();

        if (stored_task === null) {
            alert("This task cannot be deleted");
            return;
        }

        this.taskService.deleteTask(stored_task.id).subscribe((_) => {
            alert("The task was deleted");
            this.router.navigate(["/"]);
        });
    }
}
