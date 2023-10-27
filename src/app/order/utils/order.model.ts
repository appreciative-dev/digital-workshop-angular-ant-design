import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { User } from 'src/app/auth/utils/auth.model'
import { Client } from 'src/app/client/utils/client.model'
import { FormType } from 'src/app/shared/model/form.model'
import { RepositoryEntityStatus } from 'src/app/shared/repository/repository.model'
import { Spare } from 'src/app/spare/utils/spare.model'

export interface Order {
  id?: string
  client?: Client
  user?: User
  disrepairs: Array<Disrepair>
  timestamp?: Date
  updated?: Date
  status?: OrderStatus
}

export interface Disrepair {
  description?: string
  spare: Spare
}

export interface OrderForm {
  client: FormControl<Client | null>
  user: FormControl<User | null>
  disrepairs: FormArray<FormGroup<DisrepairForm | null>>
}

export interface DisrepairForm {
  description: FormControl<number | null>
  spare: FormControl<Spare | null>
}

export interface ModalData<T> {
  item: T
  type: FormType
}

export type OrderStatus = RepositoryEntityStatus

export interface OrderStatusControl {
  value: OrderStatus
  label: string
}
