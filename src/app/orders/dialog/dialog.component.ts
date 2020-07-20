import { Component, OnInit, Inject } from "@angular/core"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"

@Component({
    selector: "app-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
    title: string
    description: string
    confirmBtnDescription: string
    closeBtnDescription: string

    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data
    ) {
        if (data.title) {
            this.title = data.title
            this.confirmBtnDescription = "Confirm"
            this.closeBtnDescription = "Cancel"
        } else {
            this.closeBtnDescription = "Continue"
        }
        this.description = data.description
    }

    ngOnInit(): void {}

    close() {
        this.dialogRef.close(false)
    }

    confirm() {
        this.dialogRef.close(true)
    }
}
