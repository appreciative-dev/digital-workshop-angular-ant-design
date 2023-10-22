import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { FormType } from 'src/app/shared/model/form.model'
import { RepositoryEntityRef, RepositoryEntityStatus } from 'src/app/shared/repository/repository.model'
import { Spare } from 'src/app/spare/utils/spare.model'
import { VehicleForm } from 'src/app/spare/utils/vehicle.model'

export interface Client {
  id?: string
  name?: string
  phone?: string
  vehicles?: Spare[]
  timestamp?: Date
  updated?: Date
  status?: ClientStatus
}

export interface ClientRef extends RepositoryEntityRef {
  name?: string
  phone?: string
  status?: ClientStatus
}

export interface ClientForm {
  name: FormControl<string | null>
  phone: FormControl<string | null>
  vehicles: FormArray<FormGroup<VehicleForm | null>>
}

export interface ClientModalData {
  item: Client
  type: FormType
}

export enum ClientFormVehicleSelect {
  TYPE = 'TYPE',
  BRAND = 'BRAND',
  MODEL = 'MODEL',
}

export type ClientStatus = 'open' | RepositoryEntityStatus

export interface ClientStatusControl {
  value: ClientStatus
  label: string
}
