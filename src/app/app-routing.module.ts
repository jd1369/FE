import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'base', loadChildren: () => import('./base/base.module').then(m => m.BaseModule) },
  { path: '', redirectTo: '/base/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/base/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true,scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
