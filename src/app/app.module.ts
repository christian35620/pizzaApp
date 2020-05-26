import { AngularFireModule } from "@angular/fire"
import { AngularFirestoreModule } from "@angular/fire/firestore"

import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule } from "@angular/common/http"
import { FlexLayoutModule } from "@angular/flex-layout"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { environment } from "../environments/environment"

import { MaterialModule } from "./shared/material.module"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./home/home.component"
import { NavbarComponent } from "./layout/navbar/navbar.component"
import { LayoutComponent } from "./layout/layout.component"
import { SidenavComponent } from "./layout/sidenav/sidenav.component"

@NgModule({
    declarations: [
        AppComponent, //
        NavbarComponent,
        HomeComponent,
        LayoutComponent,
        SidenavComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
