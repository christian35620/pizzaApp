import { Component, OnInit } from "@angular/core"
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from "@angular/forms"
import { FirestoreService } from "src/app/services/firestore/firestore.service"
import { PizzaOrder } from "../../model/pizza-order.model"

@Component({
    selector: "app-order-form",
    templateUrl: "./order-form.component.html",
    styleUrls: ["./order-form.component.scss"],
})
export class OrderFormComponent implements OnInit {
    forma: FormGroup

    selectedToppings: string[] = []
    pizzaSizes: string[] = ["small", "medium", "large"]
    availableToppings: string[] = ["sausage", "pepperoni", "ham", "olives", "bacon", "corn", "pineapple", "mushrooms"]

    constructor(private fb: FormBuilder, private orderService: FirestoreService) {
        this.crearFormulario()
        this.crearListeners()
    }

    ngOnInit(): void {}

    get toppings() {
        return <FormArray>this.forma.get("orderDetails.toppings")
    }

    get orderDetails() {
        return <FormGroup>this.forma.get("orderDetails")
    }

    get pizzaSize() {
        return this.forma.get("orderDetails.pizzaSize")
    }

    get invalidName() {
        return this.forma.get("customer.name").invalid && this.forma.get("customer.name").touched
    }

    get invalidLastName() {
        return this.forma.get("customer.lastName").invalid && this.forma.get("customer.lastName").touched
    }

    get invalidPhone() {
        return this.forma.get("customer.phone").invalid && this.forma.get("customer.phone").touched
    }

    get invalidStreet() {
        return this.forma.get("address.street").invalid && this.forma.get("address.street").touched
    }

    get invalidCity() {
        return this.forma.get("address.city").invalid && this.forma.get("address.city").touched
    }

    get invalidFloor() {
        return this.forma.get("address.floor").invalid && this.forma.get("address.floor").touched
    }

    get invalidDept() {
        return this.forma.get("address.dept").invalid && this.forma.get("address.dept").touched
    }

    get date() {
        return this.forma.get("date")
    }

    crearFormulario() {
        this.forma = this.fb.group(
            {
                customer: this.fb.group({
                    name: ["", [Validators.required, Validators.minLength(5)]],
                    lastName: ["", [Validators.required]],
                    phone: ["", [Validators.required, Validators.pattern("[0-9]*")]],
                }),
                address: this.fb.group({
                    street: ["", Validators.required],
                    city: ["", Validators.required],
                    floor: ["", Validators.required],
                    dept: ["", Validators.required],
                }),
                orderDetails: this.fb.group({
                    toppings: this.fb.array([]),
                    pizzaSize: [""],
                }),
                date: [""],
            }
            // {
            //     validators: this.validadores.passwordsIguales("pass1", "pass2"),
            // }
        )
    }

    createIngredients(ingredientsInputs) {
        console.log("formControl")
        console.log(this.orderDetails)
        return this.orderDetails.setControl("toppings", this.fb.array(ingredientsInputs))
    }

    setSelectedIngredient(updatedIngredient: string) {
        console.log(updatedIngredient)
        if (this.selectedToppings.indexOf(updatedIngredient) === -1) {
            this.selectedToppings.push(updatedIngredient)
        } else {
            this.selectedToppings.splice(this.selectedToppings.indexOf(updatedIngredient), 1)
        }

        this.createIngredients(this.selectedToppings)
        console.log(this.selectedToppings)
    }

    setPizzaSize(size: string) {
        this.pizzaSize.setValue(size)
    }

    crearListeners() {
        // this.forma.valueChanges.subscribe((valor) => {
        //     console.log(valor)
        // })

        // this.forma.statusChanges.subscribe((status) => console.log({ status }))

        this.forma.get("customer.name").valueChanges.subscribe(console.log)
    }

    guardar() {
        let d = new Date().toISOString()
        this.date.setValue(d)
        console.log(this.forma)

        if (this.forma.invalid) {
            return Object.values(this.forma.controls).forEach((control) => {
                if (control instanceof FormGroup) {
                    Object.values(control.controls).forEach((control) => control.markAsTouched())
                } else {
                    control.markAsTouched()
                }
            })
        }

        this.orderService.addOrder(this.forma.value)
    }
}
