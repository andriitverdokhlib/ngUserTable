import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'add-pannel',
  templateUrl: './add-pannel.component.html',
  styleUrls: ['./add-pannel.component.scss']
})
export class AddPannelComponent implements OnDestroy {

  @Output() 
  private onAddedUser = new EventEmitter<boolean>();

  public userForm: FormGroup = new FormGroup({
    "name": new FormControl('', Validators.required),
    "email": new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    "phone": new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  private destroyer$ = new Subject();

  constructor(
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  public addUser(): void {
    this.userService.addUser(this.userForm.value)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(_ => this.onAddedUser.emit(true));
  }

  public cancel(): void {
    this.onAddedUser.emit(false);
  }

}
