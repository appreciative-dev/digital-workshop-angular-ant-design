import { Injectable } from '@angular/core'
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Spare } from '../utils/spare.model'

@Injectable()
export class SpareService {
  readonly angularFirestoreCollection: AngularFirestoreCollection<Spare>
}
