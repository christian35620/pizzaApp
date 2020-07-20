import { Injectable } from "@angular/core"
import { Adapter } from "../model/adapter"

export interface OrderApi {
    address: object //
    customer: object
    date: string
    id: string
    orderDetails: object
}

export class PizzaOrder {
    constructor(
        id?: string,
        nombre?: string,
        apellido?: string,
        phone?: number,
        direccion?: object,
        toppings?: string[],
        pizzaSize?: string,
        date?: string
    ) {}
}

@Injectable({
    providedIn: "root",
})
export class PizzaOrderAdapter implements Adapter<PizzaOrder> {
    adapt(item: any): PizzaOrder {
        return new PizzaOrder(
            item.id, //
            item.customer.name,
            item.customer.lastName,
            item.customer.phone,
            item.address,
            item.orderDetails.toppings,
            item.orderDetails.pizzaSize,
            item.date
        ) //cambiar propiedades cuando hay cambio en API
    }
}
