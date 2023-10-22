import { Component, OnInit, Signal } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Observable } from 'rxjs'
import { CLIENT_MENU_OPTIONS, MENU_OPTIONS } from '../../utils/menu-options'
import { TranslateService } from '@ngx-translate/core'
import { MessageService } from 'src/app/shared/services/message.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuTitle = 'Digital Workshop'
  toolbarTitleObs: Observable<string>

  toolBarTitle: Signal<string>

  hasFirebaseAuth: boolean
  hasEmployeeAuth: boolean

  readonly MENU_OPTIONS = MENU_OPTIONS
  readonly CLIENT_MENU_OPTIONS = CLIENT_MENU_OPTIONS

  constructor(private angularFireAuth: AngularFireAuth, private messageService: MessageService, private translate: TranslateService) {
    translate.addLangs(['es', 'pt', 'en'])
    translate.setDefaultLang('es')

    const browserLang = translate.getBrowserLang()
    translate.use(browserLang.match(/es|en/) ? browserLang : 'es')
  }

  isCollapsed = false
  isReverseArrow = false
  width = 200

  ngOnInit(): void {
    this.initUserData()
    this.updateRedirectTitle()
  }

  initUserData(): void {
    this.angularFireAuth.authState.subscribe((auth) => {
      if (auth) {
        this.hasFirebaseAuth = true
      } else {
        this.hasFirebaseAuth = false
        this.hasEmployeeAuth = false
      }
    })
  }

  updateRedirectTitle(): void {
    this.toolBarTitle = this.messageService.getToolbarTitle
  }

  onActivateRouter(): void {
    window.scroll(0, 0)
  }

  changeLanguage(lang) {
    this.translate.use(lang)
  }
}
