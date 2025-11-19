import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

import { Priority } from "../../enums/priority";
import { Status } from "../../enums/status";

@Component({
    selector: "app-task-form",
    imports: [ReactiveFormsModule],
    templateUrl: "./task-form.component.html",
    styleUrl: "./task-form.component.css",
})
export class TaskFormComponent {
    fb = inject(FormBuilder);
    statusOptions: { label: string; value: Status }[] = Object.keys(Status)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            label: key,
            value: Status[key as keyof typeof Status],
        }));
    priorityOptions: { label: string; value: Priority }[] = Object.keys(
        Priority
    )
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            label: key,
            value: Priority[key as keyof typeof Priority],
        }));

    taskForm = this.fb.nonNullable.group({
        title: ["", Validators.required],
        description: ["", Validators.required],
        dueDate: [""],
        status: [Status],
        priority: [Priority],
    });

    errorMessage: string | null = null;

    onSubmitForm() {
        const rawForm = this.taskForm.getRawValue();

        console.log(rawForm);
    }
}
