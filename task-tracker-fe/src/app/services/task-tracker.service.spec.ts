import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";

import { Sort } from "../enums/sort";
import { Task } from "../interfaces/task";
import { TaskTrackerService } from "./task-tracker.service";
import { TestBed } from "@angular/core/testing";

describe("TaskTrackerService", () => {
    let service: TaskTrackerService;
    let httpMock: HttpTestingController;
    const apiUrl = "http://localhost:5000/api/tasks";

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TaskTrackerService],
        });

        service = TestBed.inject(TaskTrackerService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should retrieve all tasks", () => {
        const mockTasks: Task[] = [
            { id: 1, title: "Task A", description: "Description A" } as Task,
            { id: 2, title: "Task B", description: "Description B" } as Task,
        ];

        service
            .getAllTasks({ searchTerm: "test", sort: Sort.Desc })
            .subscribe((tasks) => {
                expect(tasks.length).toBe(2);
                expect(tasks).toEqual(mockTasks);
            });

        const req = httpMock.expectOne(`${apiUrl}?term=test&sort=${Sort.Desc}`);
        expect(req.request.method).toBe("GET");
        req.flush(mockTasks);
    });
});
