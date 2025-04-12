import {Injectable} from '@angular/core';
import {User} from './model/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Point} from './model/point';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private checkUrl: string;
  private pointsUrl: string;
  private clearUrl: string;

  constructor(private http: HttpClient) {
    this.checkUrl = 'http://localhost:8080/check'
    this.pointsUrl = 'http://localhost:8080/points'
    this.clearUrl = 'http://localhost:8080/clear'
  }

  public getPoints(userAsJson: string): Observable<any> {
    const params = {username: JSON.parse(userAsJson).username, password: JSON.parse(userAsJson).password};
    console.log(params);
    return this.http.get<any>(this.pointsUrl, {params});
  }

  public check(userAsJson: string, x1: number, y1: number, r1: number): Observable<Point> {
    const params = {
      username: JSON.parse(userAsJson).username,
      password: JSON.parse(userAsJson).password,
      x: x1,
      y: y1,
      r: r1
    };
    console.log(params);
    return this.http.get<any>(this.checkUrl, {params});
  }

  public clear(userAsJson: string): Observable<any> {
    console.log("я хочу удалить точки пользователя", userAsJson)
    const {username, password} = JSON.parse(userAsJson);

    // Создаем тело запроса как объект, а не строку
    const userDTO = {username, password};
    return this.http.delete(this.clearUrl, {body: userDTO})

  }
}
