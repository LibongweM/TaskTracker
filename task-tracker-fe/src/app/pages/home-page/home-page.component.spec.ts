import { ActivatedRoute, Router } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomePageComponent } from "./home-page.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TaskTrackerService } from "../../services/task-tracker.service";

describe("HomePageComponent", () => {
    let component: HomePageComponent;
    let router: Router;
    let taskService: TaskTrackerService;
    let fixture: ComponentFixture<HomePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HomePageComponent,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(HomePageComponent);
        router = TestBed.inject(Router);
        taskService = TestBed.inject(TaskTrackerService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
