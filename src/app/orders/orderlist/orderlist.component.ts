import { Component, OnInit } from "@angular/core"
import { FirestoreService } from "../../core/firestore.service"
import { PizzaOrder } from "src/app/orders/model/pizza-order.model"

@Component({
    selector: "app-orderlist",
    templateUrl: "./orderlist.component.html",
    styleUrls: ["./orderlist.component.scss"],
})
export class OrderlistComponent implements OnInit {
    orders = []
    editing: boolean = false
    editingOrder: any

    constructor(private orderService: FirestoreService) {}

    ngOnInit(): void {
        this.orderService.getOrders().subscribe((orders) => {
            console.log(orders)
            this.orders = orders
        })
    }

    deleteOrder(order) {
        this.orderService.deleteOrder(order)
    }

    editOrder(order) {
        this.editing = !this.editing
        this.editingOrder = order
    }

    updateOrder() {
        this.orderService.updateOrder(this.editingOrder)
        this.editingOrder = {} as PizzaOrder
        this.editing = false
    }
}
