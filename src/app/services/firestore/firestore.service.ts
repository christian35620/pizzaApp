import { Injectable } from "@angular/core"
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { PizzaOrder } from "../../model/pizza-order.model"

@Injectable({
    providedIn: "root",
})
export class FirestoreService {
    ordersCollection: AngularFirestoreCollection<any>
    orders: Observable<any[]>
    orderDoc: AngularFirestoreDocument<any>

    constructor(private firestore: AngularFirestore) {
        // this.orders = this.firestore.collection("orders").valueChanges()
        this.ordersCollection = this.firestore.collection("orders")
        this.orders = this.ordersCollection.snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data() as PizzaOrder
                    data.id = a.payload.doc.id
                    return data
                })
            })
        )
    }

    getOrders() {
        return this.orders
    }

    addOrder(order: any) {
        this.ordersCollection.add(order)
    }

    deleteOrder(order: any) {
        this.orderDoc = this.firestore.doc(`orders/${order.id}`)
        this.orderDoc.delete()
    }

    updateOrder(order: any) {
        this.orderDoc = this.firestore.doc(`orders/${order.id}`)
        this.orderDoc.update(order)
    }
}
