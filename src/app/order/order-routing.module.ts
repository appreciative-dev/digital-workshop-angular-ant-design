import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { OrderLayoutComponent } from './components/order-layout/order-layout.component'
import { OrderFormComponent } from './components/order-form/order-form.component'

const routes: Routes = [
  {
    path: '',
    component: OrderLayoutComponent,
    children: [
      {
        path: 'create',
        component: OrderFormComponent,
      },
      {
        path: ':id',
        component: OrderFormComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class OrderRoutingModule {}
