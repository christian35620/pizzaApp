import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { OrderFormComponent } from "./components/order-form/order-form.component"
import { HomeComponent } from "./components/home/home.component"
import { ContactComponent } from "./components/contact/contact.component"

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "orders", component: OrderFormComponent },
    { path: "contact", component: ContactComponent },
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "**", pathMatch: "full", redirectTo: "home" },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
