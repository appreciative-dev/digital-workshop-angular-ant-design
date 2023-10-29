import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Order, OrderStatus } from '../../utils/order.model'
import { OrderService } from '../../services/order.service'
import { FormService } from 'src/app/shared/services/form.service'
import { ActivatedRoute } from '@angular/router'
import { OrderConstants } from '../../utils/order.constants'
import { FormLayout } from 'src/app/shared/model/form.model'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  /** DI properties*/
  readonly orderService: OrderService = inject(OrderService)
  readonly formService: FormService = inject(FormService)
  readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  /** Constants properties */
  readonly orderFormUrl: string = OrderConstants.formTemplate

  /** FormLayout properties*/
  readonly formLayout$: Observable<FormLayout<Order>> = this.formService.getFormLayout(this.orderFormUrl)

  /** FormLayout submit*/
  formSubmit(form: FormGroup) {
    if (form.valid) {
      if (true) {
        console.log(form)
        this.orderService.create<Order>(this.formService.transformFormValueToCreateObject<Order, OrderStatus>(form, 'open'))
      }
    } else {
      this.formService.highlightInvalidFields(form)
    }
  }
}
