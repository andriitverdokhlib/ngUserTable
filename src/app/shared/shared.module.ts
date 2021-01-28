import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddPannelComponent } from './add-pannel/add-pannel.component';
import { UserRowComponent } from './user-row/user-row.component';

import { NgxPhoneMaskModule } from 'ngx-phone-mask';

@NgModule({
  declarations: [
    AddPannelComponent, 
    UserRowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhoneMaskModule
  ],
  exports: [
    AddPannelComponent,
    UserRowComponent
  ]
})
export class SharedModule { }
