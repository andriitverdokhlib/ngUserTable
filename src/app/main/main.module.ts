import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { UserTableComponent } from './user-table/user-table.component';


@NgModule({
  declarations: [UserTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [UserTableComponent]
})
export class MainModule { }
