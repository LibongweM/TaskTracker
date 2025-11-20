import { ActivatedRoute, Router } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditPageComponent } from "./edit-page.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { Task } from "./../../interfaces/task";
import { TaskTrackerService } from "../../services/task-tracker.service";
import { of } from "rxjs";

describe("EditPageComponent", () => {
    let component: EditPageComponent;
    let fixture: ComponentFixture<EditPageComponent>;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let taskService: TaskTrackerService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditPageComponent, RouterTestingModule, HttpClientModule],
            providers: [
                {
                    provide: TaskTrackerService,
                    useValue: {
                        deleteTask: () => of([]),
                        getTaskById: () => of([]),
                    },
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: "1" }),
                    },
                },
            ],
        }).compileComponents();

        activatedRoute = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        taskService = TestBed.inject(TaskTrackerService);

        fixture = TestBed.createComponent(EditPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
