import { CreatePageComponent } from "./pages/create-page/create-page.component";
import { EditPageComponent } from "./pages/edit-page/edit-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        component: HomePageComponent,
        path: "",
        title: "Home",
    },
    {
        component: CreatePageComponent,
        path: "new-task",
        title: "Create New Task",
    },
    {
        component: EditPageComponent,
        path: ":id/edit",
        title: "Edit Task",
    },
];
