import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CELL_HEADERS } from 'src/app/core/constantes/table.constantes';
import { IUser } from 'src/app/core/models/user.model';

import { UserService } from 'src/app/core/services/user.service';
import { AddPannelComponent } from 'src/app/shared/add-pannel/add-pannel.component';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnDestroy {

  public users$: Observable<IUser[]>;
  private destroyer$ = new Subject();

  public cellHeaders: string[] = CELL_HEADERS;

  constructor(
    private userService: UserService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  public getUsers(): void {
    this.users$ = this.userService.getUsers();
  }

  public openAddPannelDialog(): void {
    const dialog = this.dialogService.open(AddPannelComponent);

    dialog.afterClosed$
      .pipe(takeUntil(this.destroyer$))
      .subscribe((userIsAdded: boolean) => {
      if(userIsAdded) this.getUsers();
    })
  }

  public onDeletedUser(): void {
    this.getUsers();
  }

  public onEditedUser(): void {
    this.getUsers();
  }

}
