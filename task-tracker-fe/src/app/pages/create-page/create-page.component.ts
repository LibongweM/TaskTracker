import { Component, inject } from "@angular/core";

import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskFormInterface } from "../../interfaces/task-form.interface";
import { TaskTrackerService } from "../../services/task-tracker.service";

@Component({
    selector: "app-create-page",
    imports: [TaskFormComponent],
    templateUrl: "./create-page.component.html",
    styleUrl: "./create-page.component.css",
})
export class CreatePageComponent {
    private taskService = inject(TaskTrackerService);

    onSubmitCreateForm({
        task,
    }: {
        task: TaskFormInterface;
        id: number | null;
    }) {
        this.taskService.createTask(task).subscribe((response) => {
            console.log(response);
        });
    }
}
