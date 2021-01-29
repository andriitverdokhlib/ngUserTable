import { 
  ChangeDetectionStrategy,
  Component, ElementRef, EventEmitter, 
  Input, OnDestroy, Output, ViewChild 
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: '[user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRowComponent implements OnDestroy{

  @Input('userInfo')
  public userInfo: IUser;

  @Output()
  private onDeletedUsers = new EventEmitter<void>();

  @Output()
  private onEditedUser = new EventEmitter<void>();

  @ViewChild('phone', { static: false })
  private templateVphone: ElementRef;

  public editUserInfo: IUser;

  public editModeEnabled: boolean = false;

  private destroyer$ = new Subject();
  
  constructor(
    private userService: UserService
  ) { }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  public switchEditMode(): void {
    this.editModeEnabled = !this.editModeEnabled;
  }

  public saveChanges(): void {

    const phoneWithBracers = this.templateVphone.nativeElement.value;
    this.userInfo.phone = phoneWithBracers;

    this.switchEditMode();

    this.userService.editUser(this.userInfo)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(_ => this.onEditedUser.emit());
  }

  public removeUser(): void {
    this.userService.removeUser(this.userInfo.id)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(_ =>this.onDeletedUsers.emit());
  }

  public cancel(): void {
    this.switchEditMode();
  }

}
