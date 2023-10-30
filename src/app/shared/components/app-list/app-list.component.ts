import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
})
export class ListComponent {
  @Input()
  listData$: Observable<any>
  @Output()
  getDetails = new EventEmitter()
}
