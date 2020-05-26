import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { MaterialModule } from "../shared/material.module"

import { OrdersRoutingModule } from "./orders-routing.module"
import { OrderlistComponent } from "./orderlist/orderlist.component"
import { OrderFormComponent } from "./order-form/order-form.component"

@NgModule({
    declarations: [
        OrdersRoutingModule.components, //
        OrderlistComponent,
        OrderFormComponent,
    ],
    imports: [
        CommonModule, //
        OrdersRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class OrdersModule {}
