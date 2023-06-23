import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddprodRoutingModule } from './addprod-routing.module';
import { AddprodComponent } from './addprod.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddprodComponent],
  entryComponents: [AddprodComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AddprodRoutingModule,
    CommonModule
  ]
})
export class AddprodModule { }
