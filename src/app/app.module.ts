import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AngularFireModule } from "@angular/fire"
import { AngularFirestoreModule } from "@angular/fire/firestore"
import { environment } from "../environments/environment"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { NavbarComponent } from "./components/shared/navbar/navbar.component"
import { HomeComponent } from "./components/home/home.component"
import { ContactComponent } from "./components/contact/contact.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { OrderFormComponent } from "./components/order-form/order-form.component"
import { OrdersComponent } from "./components/orders/orders.component"
import { MaterialModule } from "./shared/material.module"

@NgModule({
    declarations: [
        AppComponent, //
        NavbarComponent,
        HomeComponent,
        ContactComponent,
        OrdersComponent,
        OrderFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
