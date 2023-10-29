import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'
import { OrderConstants } from '../../utils/order.constants'
import { FormControl } from '@angular/forms'
import { RepositoryEntityAction } from 'src/app/shared/repository/repository.model'
import { ActivatedRoute, Router } from '@angular/router'
import { filter, tap } from 'rxjs'

@Component({
  selector: 'app-order-layout',
  templateUrl: './order-layout.component.html',
  styleUrls: ['./order-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderLayoutComponent implements OnInit {
  readonly toolbarSettings = OrderConstants.toolbarSettings
  readonly router: Router = inject(Router)
  readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  readonly actionsControl: FormControl<RepositoryEntityAction>
  listData
  ngOnInit(): void {
    this.actionsControl?.valueChanges
      .pipe(
        filter((value) => !!value),
        tap((value) => {
          this.router.navigate([`./${value}`], { relativeTo: this.activatedRoute })
        })
      )
      .subscribe()
  }
}
