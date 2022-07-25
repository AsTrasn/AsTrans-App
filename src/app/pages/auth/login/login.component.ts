import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../auth.service'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })

  constructor(private authSvc: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
  }

  onLogin():void {
    const FORM_VALUE = this.loginForm.value
    this.subscription.add(
      this.authSvc.login(FORM_VALUE).subscribe( res => {
        res ? this.router.navigate(['/home']) : null
      })
    )
  }
}
