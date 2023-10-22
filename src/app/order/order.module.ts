import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { OrderRoutingModule } from './order-routing.module'
import { NgZorroAntdModule } from '../shared/design-system/ng-zorro.module'
import { SharedModule } from '../shared/shared.module'
import { OrderService } from './services/spare.service'
import { OrderLayoutComponent } from './components/order-layout/order-layout.component'

@NgModule({
  declarations: [OrderLayoutComponent],
  exports: [],
  imports: [RouterModule, CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule, OrderRoutingModule, TranslateModule, SharedModule],
  providers: [OrderService],
})
export class OrderModule {}
