import {
    Component,
    EventEmitter,
    Input,
    Output,
    effect,
    inject,
} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";

import { DatePipe } from "@angular/common";
import { Priority } from "../../enums/priority";
import { Status } from "../../enums/status";
import { Task } from "../../interfaces/task";
import { TaskFormInterface } from "../../interfaces/task-form.interface";

@Component({
    selector: "app-task-form",
    imports: [ReactiveFormsModule],
    templateUrl: "./task-form.component.html",
    styleUrl: "./task-form.component.css",
    providers: [DatePipe],
})
export class TaskFormComponent {
    @Input() task: Task | null = null;
    @Input() buttonText: string = "Create Task";
    @Output() submit = new EventEmitter<TaskFormInterface>();

    constructor(private datePipe: DatePipe) {
        effect(() => {
            if (this.task !== null) {
                const formattedDate = this.datePipe.transform(
                    this.task.dueDate,
                    "yyyy-MM-ddTHH:mm:ss"
                );
                this.taskForm.patchValue({
                    title: this.task.title,
                    description: this.task.description,
                    dueDate: formattedDate,
                    status: this.task.status,
                    priority: this.task.priority,
                });
            }
        });
    }

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

    taskForm = new FormGroup({
        title: new FormControl<string>(""),
        description: new FormControl<string>(""),
        dueDate: new FormControl<string | null>(null),
        status: new FormControl<Status>(Status.New),
        priority: new FormControl<Priority>(Priority.Low),
    });

    errorMessage: string | null = null;

    onSubmitForm() {
        const rawForm = this.taskForm.getRawValue();

        this.submit.emit(rawForm);
    }
}
