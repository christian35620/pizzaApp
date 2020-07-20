import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms"
import { PizzaOrder } from "../model/pizza-order.model"

@Component({
    selector: "app-order-form",
    templateUrl: "./order-form.component.html",
    styleUrls: ["./order-form.component.scss"],
})
export class OrderFormComponent implements OnInit {
    @Output("add") addEmitter: EventEmitter<PizzaOrder> = new EventEmitter<PizzaOrder>()
    @Output("update") updateEmitter: EventEmitter<PizzaOrder> = new EventEmitter<PizzaOrder>()

    forma: FormGroup

    editingForm: boolean
    editingOrderId: "string"
    activeSizeValue = ""

    private _pizzaSizes: string[] = [
        "small", //
        "medium",
        "large",
    ]
    private _availableToppings = [
        { name: "sausage", checked: false },
        { name: "pepperoni", checked: false },
        { name: "ham", checked: false },
        { name: "olives", checked: false },
        { name: "bacon", checked: false },
        { name: "corn", checked: false },
        { name: "pineapple", checked: false },
        { name: "mushrooms", checked: false },
    ]

    constructor(private fb: FormBuilder) {
        this.crearFormulario()
    }

    ngOnInit(): void {}

    get availableToppings() {
        return this._availableToppings
    }

    get pizzaSizes() {
        return this._pizzaSizes
    }

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
        this.forma = this.fb.group({
            customer: this.fb.group({
                name: ["", [Validators.required, Validators.minLength(2)]],
                lastName: ["", [Validators.required, Validators.minLength(2)]],
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
            deliveryInstructions: [""],
        })
    }

    createIngredients(ingredientsInputs) {
        return this.orderDetails.setControl("toppings", this.fb.array(ingredientsInputs))
    }

    setSelectedIngredient(updatedIngredient: string) {
        this.availableToppings.forEach((topping) => {
            if (topping.name == updatedIngredient) {
                topping.checked = !topping.checked
            }
        })

        let selectedToppings = this.availableToppings
            .filter((topping) => {
                return topping.checked == true
            })
            .map((item) => item.name)

        this.createIngredients(selectedToppings)
    }

    setPizzaSize(size: any) {
        this.pizzaSize.setValue(size)
        this.activeSizeValue = size
    }

    editForm(order: any) {
        this.editingOrderId = order.id
        this.resetForm()
        this.editingForm = true

        let orderPizzaSize = order.orderDetails.pizzaSize
        let orderToppings = order.orderDetails.toppings
        this.forma.reset({
            customer: {
                name: order.customer.name,
                lastName: order.customer.lastName,
                phone: order.customer.phone,
            },
            address: {
                street: order.address.street,
                city: order.address.city,
                floor: order.address.floor,
                dept: order.address.dept,
            },
            orderDetails: {
                toppings: orderToppings,
                pizzaSize: orderPizzaSize,
            },
            deliveryInstructions: order.deliveryInstructions,
        })
        this.activeSizeValue = orderPizzaSize
        this.availableToppings.forEach((topping) => {
            if (orderToppings.indexOf(topping.name) != -1) {
                topping.checked = true
            }
        })
    }

    resetForm() {
        this.forma.reset()
        this.activeSizeValue = ""
        this.availableToppings.forEach((topping) => {
            topping.checked = false
        })
        this.editingForm = false
    }

    cancel() {
        this.resetForm()
    }

    guardar() {
        this.setCurrentDate()
        this.checkFormValidity()
        this.addEmitter.emit(this.forma.value)
        this.resetForm()
    }

    updateForm() {
        this.setCurrentDate()
        this.checkFormValidity()
        this.updateEmitter.emit({ order: this.forma.value, orderId: this.editingOrderId })
        this.resetForm()
    }

    checkFormValidity() {
        if (this.forma.invalid) {
            return Object.values(this.forma.controls).forEach((control) => {
                if (control instanceof FormGroup) {
                    Object.values(control.controls).forEach((control) => control.markAsTouched())
                } else {
                    control.markAsTouched()
                }
            })
        }
    }

    setCurrentDate() {
        let d = new Date().toISOString()
        this.date.setValue(d)
    }
}
