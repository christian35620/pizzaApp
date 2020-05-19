import { Component, OnInit } from "@angular/core"
import { FirestoreService } from "../../services/firestore/firestore.service"

@Component({
    selector: "app-orderlist",
    templateUrl: "./orderlist.component.html",
    styleUrls: ["./orderlist.component.scss"],
})
export class OrderlistComponent implements OnInit {
    constructor(private orderService: FirestoreService) {}

    ngOnInit(): void {
        this.orderService.getOrders().subscribe((orders) => {
            console.log(orders)
        })
    }
}
