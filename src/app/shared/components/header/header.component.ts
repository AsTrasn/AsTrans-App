import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subcription: Subscription = new Subscription
  isAdmin = false
  isLogged = false

  @Output() toggleSidenav = new EventEmitter<void>()

  constructor(public authSvc: AuthService) { }
  
  ngOnDestroy(): void {
    this.subcription.unsubscribe()
  }

  ngOnInit(): void {
    this.subcription.add(
      this.authSvc.isLogged.subscribe(res => this.isLogged = res)
    )
  }

  onToggleSidenav(): void{
    this.toggleSidenav.emit()
  }

  onLogout(): void{
    this.authSvc.logout()
  }

  getName(): string{
    return this.authSvc.getUserName()
  }
}
