import { ActivatedRoute, Router } from "@angular/router";
import { Component, inject, signal } from "@angular/core";
import { TASKS_DUMMY, TaskDummy } from "../../test.data";

@Component({
    selector: "app-edit-page",
    imports: [],
    templateUrl: "./edit-page.component.html",
    styleUrl: "./edit-page.component.css",
})
export class EditPageComponent {
    id = signal("");
    private activatedRoute = inject(ActivatedRoute);
    task = signal<TaskDummy | null>(null);

    constructor() {
        this.activatedRoute.params.subscribe((params) => {
            this.id.set(params["id"]);
        });

        const data = TASKS_DUMMY.find((t) => t.id === parseInt(this.id()));

        if (data) {
            this.task.set(data);
        }
    }
}
