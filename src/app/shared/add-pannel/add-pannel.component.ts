import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'add-pannel',
  templateUrl: './add-pannel.component.html',
  styleUrls: ['./add-pannel.component.scss']
})
export class AddPannelComponent implements OnDestroy {

  @ViewChild('phone', { static: false })
  private templateVphone: ElementRef;

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
    private userService: UserService,
    private dialogRef: DialogRef
  ) {}

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  private closeDialog(result: boolean): void {
    this.dialogRef.close(result)
  }

  public addUser(): void {
    const phoneWithBracers = this.templateVphone.nativeElement.value;

    this.userForm.patchValue({phone: phoneWithBracers});
    this.userService.addUser(this.userForm.value)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(_ => this.closeDialog(true));
  }

  public cancel(): void {
    this.closeDialog(false);
  }

}
