import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddprodComponent } from './addprod.component';

const routes: Routes = [
  {
    path: '',
    component: AddprodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddprodRoutingModule {}
