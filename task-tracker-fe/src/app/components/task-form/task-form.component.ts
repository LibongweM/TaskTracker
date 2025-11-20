import {
    Component,
    EventEmitter,
    Input,
    Output,
    effect,
    inject,
    input,
    signal,
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
    task = input<Task | null>(null);
    @Input() buttonText: string = "Create Task";
    @Output() formHandler = new EventEmitter<{
        task: TaskFormInterface;
        id: number | null;
    }>();
    taskId = signal<number | null>(null);

    constructor(private datePipe: DatePipe) {
        effect(() => {
            const _task = this.task();

            if (_task !== null) {
                const formattedDate = this.datePipe.transform(
                    _task.dueDate,
                    "yyyy-MM-ddTHH:mm:ss"
                );
                this.taskForm.patchValue({
                    title: _task.title,
                    description: _task.description,
                    dueDate: formattedDate,
                    status: _task.status,
                    priority: _task.priority,
                });
                this.taskId.set(_task.id);
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
        this.formHandler.emit({ task: rawForm, id: this.taskId() });
    }
}
