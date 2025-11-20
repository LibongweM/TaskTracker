import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreatePageComponent } from "./create-page.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { TaskTrackerService } from "../../services/task-tracker.service";

describe("CreatePageComponent", () => {
    let component: CreatePageComponent;
    let fixture: ComponentFixture<CreatePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CreatePageComponent,
                RouterTestingModule,
                HttpClientModule,
            ],
            providers: [TaskTrackerService],
        }).compileComponents();

        fixture = TestBed.createComponent(CreatePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
