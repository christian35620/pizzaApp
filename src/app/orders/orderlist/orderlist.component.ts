import { Component, Input, Output, EventEmitter } from "@angular/core"
import { PizzaOrder } from "src/app/orders/model/pizza-order.model"
import { Observable } from "rxjs"

@Component({
    selector: "app-orderlist",
    templateUrl: "./orderlist.component.html",
    styleUrls: ["./orderlist.component.scss"],
})
export class OrderlistComponent {
    @Input("orders") orders$: Observable<PizzaOrder[]>
    @Output("delete") deleteEmitter: EventEmitter<PizzaOrder> = new EventEmitter<PizzaOrder>()
    @Output("edit") editEmitter: EventEmitter<PizzaOrder> = new EventEmitter<PizzaOrder>()

    constructor() {}

    deleteOrder(order: PizzaOrder) {
        this.deleteEmitter.emit(order)
    }

    editOrder(order: PizzaOrder) {
        this.editEmitter.emit(order)
    }
}
