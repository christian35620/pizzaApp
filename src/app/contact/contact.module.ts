import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { ContactRoutingModule } from "./contact-routing.module"

@NgModule({
    declarations: [ContactRoutingModule.components],
    imports: [
        CommonModule, //
        ContactRoutingModule,
    ],
})
export class ContactModule {}
