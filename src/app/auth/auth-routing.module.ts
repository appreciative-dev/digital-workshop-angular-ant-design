import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { UsersComponent } from './components/users/users.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
