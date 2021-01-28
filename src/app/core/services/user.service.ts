import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('users');
  }

  public addUser(userDbo: IUser): Observable<IUser> {
    return this.http.post<IUser>('users', userDbo);
  }

  public editUser(userDbo: IUser): Observable<IUser> {
    return this.http.put<IUser>(`users/${userDbo.id}`, userDbo);
  }

  public removeUser(userId: number): Observable<IUser> {
    return this.http.delete<IUser>(`users/${userId}`);
  }
}
