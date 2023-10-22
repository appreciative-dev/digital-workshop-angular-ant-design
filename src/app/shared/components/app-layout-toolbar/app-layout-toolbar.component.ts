import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FilterField } from '../../repository/repository.model'
import { tap } from 'rxjs'

@Component({
  selector: 'app-layout-toolbar',
  templateUrl: './app-layout-toolbar.component.html',
  styleUrls: ['./app-layout-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutToolbarComponent implements OnInit {
  @Input()
  searchControl: FormControl<FilterField>
  @Input()
  hasSearchValueControl: FormControl<boolean>
  @Input()
  formOpenControl: FormControl
  @Input()
  entityStatusControl: FormControl
  @Input()
  entityStatusList: Array<any>
  @Input()
  searchFieldList: Array<any>
  @Input()
  searchControlInitialValue: FilterField

  searchValue: string
  searchField: string
  hasSearchValue: boolean

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.searchField = this.searchFieldList[0].value
    this.updateSearchIconAppearance()
  }

  changeType(field: string) {
    this.searchField = field
  }

  changeField(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.searchControl.setValue({ key: this.searchField, value: value })
  }

  resetSearchField() {
    this.hasSearchValue = false
    this.searchValue = null
    this.searchControl.setValue(this.searchControlInitialValue)
  }

  updateSearchIconAppearance() {
    this.hasSearchValueControl.valueChanges
      .pipe(
        tap((value) => {
          this.hasSearchValue = value
          this.cdr.markForCheck()
        })
      )
      .subscribe()
  }
}
