import { Component, PipeTransform, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TASKS_DUMMY, TaskDummy } from "../../test.data";
import { map, startWith } from "rxjs/operators";

import { AsyncPipe } from "@angular/common";
import { NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Task } from "../../interfaces/task";

function search(text: string): TaskDummy[] {
    return TASKS_DUMMY.filter((task) => {
        const term = text.toLowerCase();
        return (
            task.title.toLowerCase().includes(term) ||
            task.description.toLowerCase().includes(term)
        );
    });
}

@Component({
    selector: "app-home-page",
    imports: [AsyncPipe, ReactiveFormsModule, NgbHighlight],
    templateUrl: "./home-page.component.html",
    styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
    tasks$: Observable<TaskDummy[]>;
    filter = new FormControl("", { nonNullable: true });
    private router = inject(Router);

    constructor() {
        this.tasks$ = this.filter.valueChanges.pipe(
            startWith(""),
            map((text) => search(text))
        );
    }

    view(id: number) {
        this.router.navigateByUrl(`${id}/edit`);
    }
}
