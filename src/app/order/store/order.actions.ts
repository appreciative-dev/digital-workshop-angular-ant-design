import { createActionGroup, emptyProps, props } from '@ngrx/store'
import {
  Log,
  RepositoryRequest,
  RepositoryRequestQuery,
  RepositoryResponseCategory,
  RepositoryResponseEntity,
} from 'src/app/shared/repository/repository.model'
import { Order, OrderStatus } from '../utils/order.model'

export const OrderActions = createActionGroup({
  source: 'ORDERS',
  events: {
    'Create Order': props<{ item: Order }>(),
    'Create Order Success': props<{ response: RepositoryResponseEntity; total: number }>(),
    'Update Order': props<{ item: Order; log: Log<Order> }>(),
    'Update Order Status': props<{ id: string; status: OrderStatus }>(),
    'Update Order Success': emptyProps(),
    'Get Orders': props<{ request: RepositoryRequest<Order, OrderStatus> }>(),
    'Get Orders Success': props<{ response: Order[]; query: RepositoryRequestQuery; total?: number }>(),
    'Notify Error': props<{ error: Error; errorType: RepositoryResponseCategory }>(),
    'Reset Form State': emptyProps(),
    'Reset List State': emptyProps(),
  },
})
