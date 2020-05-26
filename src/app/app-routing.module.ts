import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { HomeComponent } from "./home/home.component"

const routes: Routes = [
    { path: "home", component: HomeComponent },
    {
        path: "orders",
        loadChildren: () => import("./orders/orders.module").then((m) => m.OrdersModule),
    },
    {
        path: "contact",
        loadChildren: () => import("./contact/contact.module").then((m) => m.ContactModule),
    },
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "**", pathMatch: "full", redirectTo: "home" },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
