import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit.component';
import { EditprodRoutingModule } from './edit-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [EditComponent],
  entryComponents: [EditComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EditprodRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditModule { }
