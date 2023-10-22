import { Injectable } from '@angular/core'
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { VEHICLE_COLLECTION_NAME } from '../utils/spare.const'
import { Spare } from '../utils/spare.model'

export const COLLECTION_NAME = VEHICLE_COLLECTION_NAME

@Injectable()
export class SpareService {
  readonly angularFirestoreCollection: AngularFirestoreCollection<Spare>
}
