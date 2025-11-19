import { Component } from "@angular/core";
import { TaskFormComponent } from "../../components/task-form/task-form.component";

@Component({
    selector: "app-create-page",
    imports: [TaskFormComponent],
    templateUrl: "./create-page.component.html",
    styleUrl: "./create-page.component.css",
})
export class CreatePageComponent {}
