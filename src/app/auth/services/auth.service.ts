import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {}

  login(user) {
    this.user = user
    this.router.navigateByUrl('/orders')
  }
}
