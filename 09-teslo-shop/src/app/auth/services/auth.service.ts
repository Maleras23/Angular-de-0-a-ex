import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-reponse.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseURL = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  // este es el token de autenticacion
  private _token = signal<string | null>(localStorage.getItem('token'));


  // para poder hacer la petidicones http
  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  })

  // para confirmar el estatus en la parte del login
  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking'
    // para determinar si estras autenticado o no
    if (this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated'
  })



  user = computed<User|null>(() => this._user());
  token = computed(this._token);
  isAdmin = computed( () => this._user()?.roles.includes('admin') ?? false)

  // aqui vamos hacer la peticion http
  login(email:string, password: string):Observable<boolean>{
    return this.http.post<AuthResponse>(`${baseURL}/auth/login`, {
      email: email,
      password: password,
    }).pipe(
      // aqui manejamos los casos de login exitosos
      map( resp => this.handleAuthSuccess(resp)),
      // aqui manejamos los errores en el login
      catchError((error: any) => this.handleAuthError(error))
    )
  };

  register(fullName: string, email: string, password: string):Observable<boolean>{
    return this.http.post<AuthResponse>(`${baseURL}/auth/register`,{
      fullName: fullName,
      email: email,
      password: password,
    }).pipe(
      tap( resp => console.log({resp})),
       // aqui manejamos los casos de login exitosos
      map( resp => this.handleRegisterSuccess(resp)),
      // aqui manejamos los errores en el login
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  handleRegisterSuccess({token, user}: AuthResponse){
    if(user){
      return true;
    }
    return false
  }

  checkStatus():Observable<boolean>{
    const token = localStorage.getItem('token');
    if (!token){
      this.logout();
      return of (false);
    }

    return this.http.get<AuthResponse>(`${ baseURL }/auth/check-status`,{
        // headers: {
        //   Authorization:`Bearer ${token}`,
        // },
      })
      .pipe( // aqui manejamos los casos de login exitosos
      // aqui manejamos los casos de login exitosos
      map( resp => this.handleAuthSuccess(resp)),
      // aqui manejamos los errores en el login
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  logout(){
    this._user.set(null)
    this._token.set(null)
    this._authStatus.set('not-authenticated')

    localStorage.removeItem('token')
  }

  private handleAuthSuccess({token, user}: AuthResponse){
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token)

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError( error: any){
    console.log({error})
    this.logout();
    return of(false);
  }
}
