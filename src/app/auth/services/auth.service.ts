import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { User } from '@auth/interfaces/user-interface';
import { DataLogin } from '@auth/interfaces/user.data.token-interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

type AuthStatus = "checking" | "authenticated" | "not-authenticated";
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {

  private _authStatus = signal<AuthStatus>("checking");
  private _user = signal<User| null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private userCache = new Map<string , DataLogin >()


  private http = inject(HttpClient);

  starusResourse = rxResource({
    loader: () => this.userStatus()
  })

  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === "checking") return "checking";

    if(this._user()) return "authenticated";

    return "not-authenticated"
  });

  user = computed<User | null>(() => this._user());
  token = computed<string | null>(() => this._token())
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false )

  login (Email: string, Password: string): Observable<boolean> {
   return this.http.post<DataLogin>(`${baseUrl}/auth/login`, {
      email: Email,
      password: Password
    }).pipe(
      map( data => this.handleAuthLogin(data)),
      catchError((err:any) => this.handleAuthError(err))
    )
  }

  register (email: string, password:string, fullName:string): Observable<boolean> {
    return this.http.post<DataLogin>(`${baseUrl}/auth/register`, {
      email,
      password,
      fullName
    }).pipe(
      map( data =>  true),
      catchError((err:any) => { return of(false)} )
    )
  }

  userStatus (): Observable<boolean> {
    const token = localStorage.getItem('token')
    if(!token){
      this.logOut()
      return of(false)
    }
  if(this.userCache.has(token)){
    const dataUser = this.userCache.get(token)!
    console.log('cargado del cache');

    return of(this.handleAuthLogin(dataUser))
  }

   return this.http.get<DataLogin>(`${baseUrl}/auth/check-status`)
   .pipe(
      tap( data => this.userCache.set(data.token,data)),
      tap( data => console.log('cargando de la api')),
      map( data => this.handleAuthLogin(data)),
      catchError((err:any) => this.handleAuthError(err))
   )
  }

  logOut () {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set("not-authenticated");
        localStorage.removeItem('token')
  }

  private handleAuthLogin (data: DataLogin) {
        this._authStatus.set("authenticated");
        this._user.set(data.user);
        this._token.set(data.token);
        localStorage.setItem('token', data.token);
        return true
  }
private handleAuthError (error: any) {
        this.logOut()
        return of(false)
}


}
