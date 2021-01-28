import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from 'src/app/core/models/user.model';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  public users$: Observable<IUser[]>;

  public isAdding: boolean = false;
  public selectedUser: number;

  public headerCells: string[] = ['Name', 'Email', 'Phone', 'Actions'];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.users$ = this.userService.getUsers();
  }

  public switchAdding(): void {
    this.isAdding = !this.isAdding
  }

  public onAddedUser(userIsAdded: boolean): void {
    this.isAdding = false;
    
    if (userIsAdded) this.getUsers();
  }

  public onDeletedUser(): void {
    this.getUsers();
  }

}
