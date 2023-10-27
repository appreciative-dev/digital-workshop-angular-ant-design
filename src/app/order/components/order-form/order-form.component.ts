import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core'
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Observable, delay, forkJoin, map, of, tap, concat, filter } from 'rxjs'
import { Store } from '@ngrx/store'
import { fadeInOnEnterAnimation } from 'angular-animations'
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal'
import { Client, ClientForm, ClientFormVehicleSelect, ClientModalData, ClientStatus } from '../../utils/order.model'
import { NhtsaService } from 'src/app/shared/services/nhtsa.service'
import { ClientActions } from '../../store/order.actions'
import { VehicleBodyType, VehicleBrand, VehicleModel } from 'src/app/spare/utils/vehicle.model'
import { ClientConstants } from '../../utils/order.constants'
import { getFormUploadState } from '../../store/order.selectors'
import { FormAction, FormInitialization, FormType, FormUploadState } from 'src/app/shared/model/form.model'
import { ConfirmationService } from 'src/app/shared/services/confirmation.service'
import { Log, RepositoryResponseEntity } from 'src/app/shared/repository/repository.model'
import * as ClientSelectors from '../../store/order.selectors'
import { generatePdf } from '../../utils/generate-pdf'

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  animations: [fadeInOnEnterAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnInit {
  form: FormGroup<ClientForm | null>
  formInitializationState$: Observable<FormInitialization>
  formType: string = FormType.CREATE
  formTitle: string = FormAction.ADD
  editFormValue: Client
  editFormId: string
  clientLog: Array<Log<Client>>

  vehicleListByIndexMap = new Map()
  modelListByIndexMap = new Map()

  readonly modalData: ClientModalData = inject(NZ_MODAL_DATA)
  readonly phoneMaskConfig = ClientConstants.phoneMaskConfig
  readonly FormType = FormType
  readonly vehicleBodyType = VehicleBodyType
  readonly ClientFormVehicleSelect = ClientFormVehicleSelect
  readonly FormInitialization = FormInitialization

  readonly getFormUploadState$: Observable<FormUploadState<RepositoryResponseEntity>> = this.store$
    .select(getFormUploadState)
    .pipe(tap((value) => this.updateFormTemplate(value)))

  constructor(
    private store$: Store,
    private modal: NzModalRef,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.initForm()
  }

  submit() {
    if (this.form.valid) {
      if (this.formType === FormType.CREATE) {
        this.store$.dispatch(
          ClientActions.createClient({
            item: {
              ...this.form.value,
              status: 'active',
              timestamp: new Date(),
            },
          })
        )
      } else {
        this.store$.dispatch(
          ClientActions.updateClient({
            item: {
              ...this.form.value,
              id: this.editFormId,
              updated: new Date(),
            },
            log: {
              item: this.editFormValue,
              id: this.editFormId,
              timestamp: new Date(),
            },
          })
        )
      }
    } else {
      this.highlightInvalidFields()
    }
  }

  highlightInvalidFields() {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty()
        control.updateValueAndValidity({ onlySelf: true })
      }
      if (control.controls) {
        control.controls.forEach((element) =>
          Object.values(element.controls).forEach((control: any) => {
            if (control.invalid) {
              control.markAsDirty()
              control.updateValueAndValidity({ onlySelf: true })
            }
          })
        )
      }
    })
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      vehicles: new FormArray([this.addVehicleFormRow()]),
    })
    if (this.modalData.type === FormType.EDIT) {
      this.formType = FormType.EDIT
      this.formTitle = FormAction.EDIT
      this.editFormValue = this.modalData.item
      this.editFormId = this.modalData.item.id
      if (this.editFormValue.updated) {
        this.store$.dispatch(
          ClientActions.getClientLog({
            id: this.editFormId,
          })
        )
      }
    } else {
      this.formInitializationState$ = concat(of(FormInitialization.CLEAR), of(FormInitialization.LOADED).pipe(delay(60)))
    }
  }



  addVehicleFormRow() {
    return new FormGroup({
      type: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      plate: new FormControl('', Validators.required),
    })
  }

  addRow(event: Event) {
    event.preventDefault()
    this.form.controls..push(this.addVehicleFormRow())
  }

  removeRow(i: number) {
    this.form.controls.vehicles.removeAt(i)
  }

  close() {
    this.modal.close()
  }

  compareBrand = (o1: VehicleBrand, o2: VehicleBrand) => (o1 && o2 ? o1.MakeName === o2.MakeName : o1 === o2)

  compareModel = (o1: VehicleModel, o2: VehicleModel) => (o1 && o2 ? o1.Model_Name === o2.Model_Name : o1 === o2)

  updateFormTemplate(value: FormUploadState<RepositoryResponseEntity>) {
    if (value.loaded && !value.loading) {
      this.modal.close(true)
      this.store$.dispatch(ClientActions.resetFormState())
    }
  }

}
