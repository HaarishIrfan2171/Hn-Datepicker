import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HNDatepickerComponent } from './hn-datepicker.component';
import { SharedMaterialModule } from '../saredmodule/shared-material.module';



@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  declarations: [HNDatepickerComponent],
  exports: [HNDatepickerComponent]
})
export class TgssDatepickerModule { }
