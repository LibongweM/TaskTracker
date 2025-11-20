import { Component, PipeTransform, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Observable, combineLatest } from "rxjs";
import { Router, RouterLink } from "@angular/router";
import { TASKS_DUMMY, TaskDummy } from "../../test.data";
import { map, startWith, switchMap } from "rxjs/operators";

import { AsyncPipe } from "@angular/common";
import { NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { Sort } from "../../enums/sort";
import { Task } from "../../interfaces/task";
import { TaskTrackerService } from "../../services/task-tracker.service";

@Component({
    selector: "app-home-page",
    imports: [AsyncPipe, ReactiveFormsModule, NgbHighlight, RouterLink],
    templateUrl: "./home-page.component.html",
    styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
    filter = new FormControl("", { nonNullable: true });
    sort = new FormControl(Sort.Asc, { nonNullable: true });
    private router = inject(Router);
    private taskService = inject(TaskTrackerService);
    tasks$: Observable<Task[]>;
    sortOptions: { label: string; value: Sort }[] = Object.keys(Sort)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            label: key,
            value: Sort[key as keyof typeof Sort],
        }));

    constructor() {
        const searchTerms$ = this.filter.valueChanges.pipe(startWith(""));
        const sortOption$ = this.sort.valueChanges.pipe(startWith(Sort.Asc));

        this.tasks$ = combineLatest([searchTerms$, sortOption$]).pipe(
            // Use switchMap only when the search term changes (API call)
            switchMap(([searchTerm, sortOption]) =>
                this.search(searchTerm, sortOption)
            )
        );
    }

    search(text: string, sort: Sort): Observable<Task[]> {
        return this.taskService.getAllTasks({ searchTerm: text, sort });
    }

    view(id: number) {
        this.router.navigateByUrl(`${id}/edit`);
    }
}
