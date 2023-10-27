import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs'
import { OrderActions } from './order.actions'
import { OrderService } from '../services/order.service'
import { NotificationService } from 'src/app/shared/services/notification.service'
import { Order, OrderStatus } from '../utils/order.model'
import { OrderConstants } from '../utils/order.constants'
import { responseTransform } from 'src/app/shared/repository/repository.utils'
import { ClientStatus } from 'src/app/client/utils/client.model'

@Injectable()
export class ClientEffects {
  constructor(private actions$: Actions, private orderService: OrderService, private notificationService: NotificationService) {}

  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      switchMap(({ item }) =>
        this.orderService.create<Order>(item).pipe(
          switchMap((response) =>
            this.orderService.getTotalByStatus<OrderStatus>(item.status).pipe(
              map((total) => {
                this.notificationService.notifyCreateSuccess(OrderConstants.notificationTitle)
                return OrderActions.createOrderSuccess({ response, total })
              }),
              catchError((error) => of(OrderActions.notifyError({ error, errorType: 'create' })))
            )
          )
        )
      )
    )
  )

  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      switchMap(({ item, log }) =>
        forkJoin([this.orderService.update<Order>(item, item.id), this.orderService.log<Order>(log)]).pipe(
          map(() => {
            this.notificationService.notifyEditSuccess(OrderConstants.notificationTitle)
            return OrderActions.updateOrderSuccess()
          }),
          catchError((error) => of(OrderActions.notifyError({ error, errorType: 'edit' })))
        )
      )
    )
  )

  updateClientStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrderStatus),
      switchMap(({ id, status }) =>
        forkJoin([this.orderService.updateStatus<ClientStatus>(id, status), this.orderService.log<Order>({ status })]).pipe(
          map(() => {
            this.notificationService.notifyEditSuccess(OrderConstants.notificationTitle)
            return OrderActions.updateOrderSuccess()
          }),
          catchError((error) => of(OrderActions.notifyError({ error, errorType: 'status' })))
        )
      )
    )
  )

  clientsController$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getOrders),
      switchMap(({ request }) => {
        const size = request.pagination.size
        const item = request.pagination.item
        const order = request.order
        const status = request.filter.status
        const field = request.filter.field
        switch (request.query) {
          case 'first':
            return this.orderService.getFirstPage<Order, ClientStatus>(order, size, status).pipe(
              responseTransform(this.notificationService),
              switchMap((response) =>
                this.orderService
                  .getTotalByStatus<OrderStatus>(status)
                  .pipe(map((total) => OrderActions.getOrdersSuccess({ response, query: 'first', total })))
              ),
              catchError((error) => of(OrderActions.notifyError({ error, errorType: 'list' })))
            )
          case 'next':
            return this.orderService.getNextPage<Order, OrderStatus, typeof order.key>(order, size, status, item[order.key]).pipe(
              responseTransform(this.notificationService),
              map((response) => OrderActions.getOrdersSuccess({ response, query: 'next' })),
              catchError((error) => of(OrderActions.notifyError({ error, errorType: 'list' })))
            )
          case 'previous':
            return this.orderService.getPreviousPage<Order, OrderStatus, typeof order.key>(order, size, status, item[order.key]).pipe(
              responseTransform(this.notificationService),
              map((response) => OrderActions.getOrdersSuccess({ response, query: 'previous' })),
              catchError((error) => of(OrderActions.notifyError({ error, errorType: 'list' })))
            )
          case 'custom':
            return this.orderService.getAllByQuery<Order>(field.key, field.value).pipe(
              responseTransform(this.notificationService),
              map((response) => OrderActions.getOrdersSuccess({ response, query: 'custom', total: response.length })),
              catchError((error) => of(OrderActions.notifyError({ error, errorType: 'list' })))
            )
        }
      })
    )
  )

  notifyError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.notifyError),
        tap(({ error }) => console.error(error)),
        switchMap(() => of(this.notificationService.notifyError()))
      ),
    { dispatch: false }
  )
}
