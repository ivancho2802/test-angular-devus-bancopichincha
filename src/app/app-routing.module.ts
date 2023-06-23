import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/addprod/addprod.module').then( m => m.AddprodModule)
  },
  {
    path: 'edit/:prods',
    loadChildren: () => import('./pages/edit/edit.module').then( m => m.EditModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
