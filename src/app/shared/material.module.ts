import { NgModule } from "@angular/core"

import { MatButtonModule } from "@angular/material/button"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatCardModule } from "@angular/material/card"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatIconModule } from "@angular/material/icon"
import { MatListModule } from "@angular/material/list"
import { MatExpansionModule } from "@angular/material/expansion"

@NgModule({
    declarations: [],
    imports: [
        MatButtonModule, //
        MatCheckboxModule,
        MatButtonToggleModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
    ],
    exports: [
        MatButtonModule, //
        MatCheckboxModule,
        MatButtonToggleModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
    ],
})
export class MaterialModule {}
