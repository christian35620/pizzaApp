import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core"
import { FirestoreService } from "../core/firestore.service"
import { catchError, tap } from "rxjs/operators"
import { EMPTY, Subscription } from "rxjs"
import { PizzaOrder } from "src/app/orders/model/pizza-order.model"

import { MatDialog, MatDialogConfig } from "@angular/material/dialog"
import { DialogComponent } from "./dialog/dialog.component"
import { OrderFormComponent } from "./order-form/order-form.component"

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit, OnDestroy {
    errorMessage

    @ViewChild(OrderFormComponent) form: OrderFormComponent

    orders$ = this.orderService.orders$.pipe(
        tap((orders) => console.log(orders)),
        catchError((err) => {
            this.errorMessage = err
            return EMPTY
        })
    )

    private saveSubscription: Subscription

    constructor(private orderService: FirestoreService, private matDialog: MatDialog) {}

    ngOnInit(): void {
        this.saveSubscription = this.orderService.savedData$.subscribe((result) => {
            this.openDialog(result)
        })
    }

    addOrder(order: PizzaOrder) {
        this.orderService.addOrder(order)
    }

    deleteOrder(order: PizzaOrder) {
        this.orderService.deleteOrder(order)
    }

    updateOrder(updatingObject: object) {
        this.orderService.updateOrder(updatingObject)
    }

    editOrder(order: PizzaOrder) {
        this.form.editForm(order)
    }

    openDialog(result: any) {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.data = {
            description: result.message,
        }

        const dialogRef = this.matDialog.open(DialogComponent, dialogConfig)
    }

    ngOnDestroy() {
        this.saveSubscription.unsubscribe()
    }
}
