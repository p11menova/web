import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private loginUrl: string;
  private registerUrl: string;

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/login';
    this.registerUrl = 'http://localhost:8080/register'
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.loginUrl);
  }

  public login(user: User): Observable<any>  {
    return this.http.post<any>(this.loginUrl, user, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // разрешить отправку cookie, если нужно
    })
  }
  public register(user: User): Observable<any>{
    console.log(user.username)

    return this.http.post<any>(this.registerUrl, user, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // разрешить отправку cookie, если нужно
    })

  }

}
