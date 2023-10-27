import { PaginationRequest } from 'src/app/shared/model/pagination.model'
import { OrderRequest } from 'src/app/shared/repository/repository.model'
import { Toolbar } from 'src/app/shared/model/toolbar.model'
import { Order } from './order.model'

export abstract class OrderConstants {
  static readonly storeFeatureKey = 'Orders'
  static readonly notificationTitle = 'Orders'
  static readonly collectionName = 'orders'
  static readonly tableNoResult = 'No orders found'
  static readonly paginationTitle = 'orders'
  static readonly paginationSize = [3, 5, 10]
  static readonly toolbarSettings: Toolbar = {
    title: 'Manage information about orders',
    buttonTitle: 'New order',
    hasStatusBar: true,
  }
  static readonly orderControlInitialValue: OrderRequest = { key: 'timestamp', value: 'desc' }
  static readonly paginationControlInitialValue: PaginationRequest<Order> = {
    query: 'first',
    item: null,
    size: 5,
  }
}
