import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Observable, filter, map, switchMap } from 'rxjs'
import { NhtsaService } from '../../../shared/services/nhtsa.service'
import { VehicleBodyType } from '../../utils/vehicle.model'

@Component({
  selector: 'app-spare-list',
  templateUrl: './spare-list.component.html',
  styleUrls: ['./spare-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpareListComponent implements OnInit {
  bodyType: FormControl = new FormControl(null)
  vehicleName: FormControl = new FormControl(null)
  modelName: FormControl = new FormControl(null)

  desc
  value

  vehiclesList$: Observable<any>
  modelList$: Observable<any>
  manufacturerDetails$: Observable<any>

  readonly vehicleBodyType = VehicleBodyType

  constructor(private nhtsaService: NhtsaService) {}

  ngOnInit() {
    this.vehiclesList$ = this.bodyType.valueChanges.pipe(switchMap((val) => this.nhtsaService.getVehiclesByBodyType(val).pipe()))

    this.manufacturerDetails$ = this.vehicleName.valueChanges.pipe(
      filter((value) => !!value),
      map((val) => {
        console.log(val)

        return (this.manufacturerDetails$ = this.nhtsaService.getManufacturerDetails(val.MakeName).pipe(map((val) => val.Results)))
      })
      // switchMap((val) => this.nhtsaService.getVehicleModelsById(val.MakeId)),
      // shareReplay(1)
    )
  }
}
