import { Toolbar } from 'src/app/shared/model/toolbar.model'

export abstract class OrderConstants {
  static readonly toolbarSettings: Toolbar = {
    title: 'Request and recieve orders for clients',
    buttonTitle: 'Request order',
  }
  static readonly collectionName = 'orders'
  static readonly formTemplate = 'assets/forms/order/form-template.json'
}
