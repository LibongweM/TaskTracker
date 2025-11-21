import {
    Component,
    PipeTransform,
    effect,
    inject,
    signal,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgbAlertModule, NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { Observable, combineLatest, of } from "rxjs";
import { Router, RouterLink } from "@angular/router";
import {
    catchError,
    finalize,
    map,
    startWith,
    switchMap,
    tap,
} from "rxjs/operators";

import { AsyncPipe } from "@angular/common";
import { Result } from "../../types/result";
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
    loading = signal<boolean>(false);

    filter = new FormControl("", { nonNullable: true });
    sort = new FormControl(Sort.Asc, { nonNullable: true });

    private router = inject(Router);
    private taskService = inject(TaskTrackerService);

    filterTerm$ = this.filter.valueChanges.pipe(startWith(""));
    sortOption$ = this.sort.valueChanges.pipe(startWith(Sort.Asc));

    sortOptions: { label: string; value: Sort }[] = Object.keys(Sort)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            label: key,
            value: Sort[key as keyof typeof Sort],
        }));

    private rawResult$: Observable<Result<Task[]>> = combineLatest([
        this.filterTerm$,
        this.sortOption$,
    ]).pipe(
        switchMap(([searchTerm, sort]) => {
            // We DO NOT update signals here (would cause infinite CD)
            return this.taskService.getAllTasks({ searchTerm, sort }).pipe(
                catchError(() =>
                    of({
                        isSuccess: false,
                        errorMessage: "Unexpected network error",
                        data: [],
                    } as Result<Task[]>)
                )
            );
        })
    );

    tasks$: Observable<Task[]> = this.rawResult$.pipe(
        map((res) =>
            res.isSuccess ? (res as SuccessResponse<Task[]>).data : []
        )
    );

    constructor() {
        // Set loading=true whenever a new search starts
        combineLatest([this.filterTerm$, this.sortOption$]).subscribe(() => {
            this.loading.set(true);
            this.error.set(null);
        });

        effect(() => {
            this.rawResult$.subscribe((res) => {
                this.loading.set(false);
                this.error.set(res.isSuccess ? null : res.errorMessage);
            });
        });
    }

    view(id: number) {
        this.router.navigateByUrl(`${id}/edit`);
    }
}
