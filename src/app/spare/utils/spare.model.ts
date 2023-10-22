import { FormControl } from '@angular/forms'
import { VehicleBodyType, VehicleBrand, VehicleModel } from './vehicle.model'

export interface Spare {
  id?: string
  type?: VehicleBodyType
  brand?: VehicleBrand
  model?: VehicleModel
  year?: number
  plate?: string
}
