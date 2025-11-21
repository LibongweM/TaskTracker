import { Component, PipeTransform, inject, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgbAlertModule, NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { Observable, combineLatest } from "rxjs";
import { Router, RouterLink } from "@angular/router";
import { map, startWith, switchMap, tap } from "rxjs/operators";

import { AsyncPipe } from "@angular/common";
import { Sort } from "../../enums/sort";
import { SuccessResponse } from "../../interfaces/success-response.interface";
import { Task } from "../../interfaces/task";
import { TaskTrackerService } from "../../services/task-tracker.service";

@Component({
    selector: "app-home-page",
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        NgbHighlight,
        RouterLink,
        NgbAlertModule,
    ],
    templateUrl: "./home-page.component.html",
    styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
    error = signal<string | null>(null);
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
                this.taskService.getAllTasks({ searchTerm, sort: sortOption })
            ),
            tap((result) => {
                if (!result.isSuccess) {
                    this.error.set(result.errorMessage);
                }
            }),
            map((result) =>
                result.isSuccess === true
                    ? (result as SuccessResponse<Task[]>).data
                    : []
            )
        );
    }

    view(id: number) {
        this.router.navigateByUrl(`${id}/edit`);
    }
}
