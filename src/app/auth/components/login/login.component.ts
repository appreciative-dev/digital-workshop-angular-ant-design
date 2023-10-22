import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { fadeInOnEnterAnimation } from 'angular-animations'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOnEnterAnimation()],
})
export class LoginComponent implements OnInit {
  user = new FormControl()
  hasError: boolean

  ngOnInit(): void {}

  constructor(private authService: AuthService) {}

  login() {
    this.hasError = false
    if (this.user.value) {
      this.authService.login(this.user.value)
    } else {
      console.log('invalid')

      this.hasError = true
    }
  }
}
