import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/users`);
  }

  public addUser(userDbo: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}/users`, userDbo);
  }

  public editUser(userDbo: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/users/${userDbo.id}`, userDbo);
  }

  public removeUser(userId: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.baseUrl}/users/${userId}`);
  }
}
