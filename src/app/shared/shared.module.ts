import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { MouseOnHoverDirective } from './services/mouse-on-hover.directive'
import { NgZorroAntdModule } from './design-system/ng-zorro.module'
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'
import { antDesignIcons } from './design-system/ng-zorro.config'
import { NZ_ICONS } from 'ng-zorro-antd/icon'
import { MaterialModule } from './design-system/material.module'
import { AppTablePaginationComponent } from './components/app-table-pagination/app-table-pagination.component'
import { AppInfoComponent } from './components/app-info/app-info.component'
import { AppNotFoundComponent } from './components/app-not-found/app-not-found.component'
import { AppLoaderComponent } from './components/app-loader/app-loader.component'
import { AppConfirmationModal } from './components/app-confirmation-modal/app-confirmation-modal.component'
import { AppLayoutToolbarComponent } from './components/app-layout-toolbar/app-layout-toolbar.component'
import { TimestampPipe } from './utils/date.pipe'

@NgModule({
  declarations: [
    MouseOnHoverDirective,
    AppTablePaginationComponent,
    AppInfoComponent,
    AppNotFoundComponent,
    AppConfirmationModal,
    AppLoaderComponent,
    AppLayoutToolbarComponent,
    TimestampPipe,
  ],
  exports: [
    MaterialModule,
    NgZorroAntdModule,
    MouseOnHoverDirective,
    AppTablePaginationComponent,
    AppInfoComponent,
    AppLoaderComponent,
    AppNotFoundComponent,
    AppLayoutToolbarComponent,
    TimestampPipe,
  ],
  imports: [RouterModule, CommonModule, MaterialModule, NgZorroAntdModule, FormsModule, ReactiveFormsModule, TranslateModule],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: antDesignIcons },
  ],
})
export class SharedModule {}
