import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ɵɵRouterLink } from "@angular/router/testing";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, ɵɵRouterLink],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {
    title = "Task Tracker";
}
