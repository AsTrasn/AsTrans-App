import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, map, throwError, BehaviorSubject } from 'rxjs'
import { UserResponse } from 'src/app/shared/models/user.interface'
import { environment } from 'src/environments/environment'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router'


const HELPER = new JwtHelperService

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router) {
    this.verifyToken()
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable()
  }

  login(authData: Partial<{ username: string | null; password: string | null }>): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
      map((res:UserResponse) => {
        this.saveToken(res.token)
        this.loggedIn.next(true)
        return res
      }),
      catchError((err) => this.handlerError(err))
    )
  }

  logout(): void {
    localStorage.removeItem('TOKEN')
    this.loggedIn.next(false)
    this.router.navigate(['/login'])
  }

  private verifyToken(): void {
    const USER_TOKEN = localStorage.getItem('TOKEN')
    const IS_EXPIRED: boolean | undefined = HELPER.isTokenExpired(USER_TOKEN ? USER_TOKEN : undefined)

    IS_EXPIRED ? this.logout() : this.loggedIn.next(true)
  }

  private saveToken(token: string): void {
    localStorage.setItem('TOKEN', token)
  }

  private handlerError(err: { message: any; }): Observable<never> {
    let errorMessage = 'Ha ocurrido un error'
    if(err) {
      errorMessage = `Error code ${err.message}`
    }
    window.alert(errorMessage)
    
    return throwError(errorMessage)
  }

  getUserName(): string {
    let token = localStorage.getItem('TOKEN')
    const INFO = HELPER.decodeToken(token ? token : undefined)
    console.log(INFO.username)
    return INFO.username
  }

  getRole(): string {
    let token = localStorage.getItem('TOKEN')
    const INFO = HELPER.decodeToken(token ? token : undefined)
    console.log(INFO.role)
    return INFO.role
  }
}
