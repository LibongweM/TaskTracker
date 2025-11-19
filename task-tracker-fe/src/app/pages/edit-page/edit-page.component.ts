import { ActivatedRoute, Router } from "@angular/router";
import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { Priority } from "../../enums/priority";
import { Status } from "../../enums/status";
import { Task } from "../../interfaces/task";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskFormInterface } from "../../interfaces/task-form.interface";
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

    constructor() {
        this.activatedRoute.params.subscribe((params) => {
            const id = +params["id"];

            const data = TasksData.find((t) => t.id === id);

            if (!data) {
                this.router.navigate(["/"]);
                return;
            }

            this.task.set(data);
        });
    }

    onSubmitForm(formData: TaskFormInterface) {
        console.log(`Form Data: calling update API`, formData);
    }
}
