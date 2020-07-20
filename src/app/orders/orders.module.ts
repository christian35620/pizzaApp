import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { MaterialModule } from "../shared/material.module"

import { OrdersRoutingModule } from "./orders-routing.module"
import { OrderlistComponent } from "./orderlist/orderlist.component"
import { OrderFormComponent } from "./order-form/order-form.component"
import { DialogComponent } from "./dialog/dialog.component"

@NgModule({
    declarations: [
        OrdersRoutingModule.components, //
        OrderlistComponent,
        OrderFormComponent,
        DialogComponent,
    ],
    imports: [
        CommonModule, //
        OrdersRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [DialogComponent],
})
export class OrdersModule {}
