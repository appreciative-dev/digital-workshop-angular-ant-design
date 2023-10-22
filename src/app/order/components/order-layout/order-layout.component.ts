import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
  selector: 'app-order-layout',
  templateUrl: './order-layout.component.html',
  styleUrls: ['./order-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderLayoutComponent implements OnInit {
  user
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user
  }
}
