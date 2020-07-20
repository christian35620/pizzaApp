import { Injectable } from "@angular/core"
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore"
import { Subject } from "rxjs"
import { map, withLatestFrom } from "rxjs/operators"
import { PizzaOrder } from "../orders/model/pizza-order.model"

@Injectable({
    providedIn: "root",
})
export class FirestoreService {
    ordersCollection: AngularFirestoreCollection<any> = this.firestore.collection("orders")
    crudSelectedOptMessages: object = {
        addOrder: {
            message: "Your order has been successfully added",
        },
        deleteOrder: {
            message: "Your order has been deleted",
        },
        updateOrder: {
            message: "Your order has been succesfully updated",
        },
    }

    orders: PizzaOrder[]
    orderDoc: AngularFirestoreDocument<any>

    private saveButtonSubject = new Subject<object>()
    saveButton$ = this.saveButtonSubject.asObservable()

    orders$ = this.ordersCollection.snapshotChanges().pipe(
        map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data()
                data.id = a.payload.doc.id
                return data
            }) as PizzaOrder
        })
    )

    savedData$ = this.saveButton$.pipe(
        withLatestFrom(this.orders$),
        map((result) => result[0])
    )

    constructor(private firestore: AngularFirestore) {}

    addOrder(order: any) {
        this.ordersCollection.add(order)
        this.saveButtonSubject.next(this.responseToCrudSelectedOption("addOrder"))
    }

    deleteOrder(order: any) {
        this.orderDoc = this.firestore.doc(`orders/${order.id}`)
        this.orderDoc.delete()
        this.saveButtonSubject.next(this.responseToCrudSelectedOption("deleteOrder"))
    }

    updateOrder(updatingObject: any) {
        this.orderDoc = this.firestore.doc(`orders/${updatingObject.orderId}`)
        this.orderDoc.update(updatingObject.order)
        this.saveButtonSubject.next(this.responseToCrudSelectedOption("updateOrder"))
    }

    responseToCrudSelectedOption(option: string): object {
        return { orderStatus: option, message: this.crudSelectedOptMessages[option].message }
    }
}
