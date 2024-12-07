import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './base/admin/admin.component';
import { BaseComponent } from './base/base.component';
import { HomeComponent } from './base/home/home.component';
import { ServicesComponent } from './base/services/services.component';
import { ProjectsComponent } from './base/projects/projects.component';
import { AboutusComponent } from './base/aboutus/aboutus.component';
import { AboutComponent } from './base/about/about.component';
import { SubservicesComponent } from './base/services/subservices/subservices.component';

const routes: Routes = [
  {
    path: 'base',
    component: BaseComponent,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'services', component: ServicesComponent, children: [
          { path: 'subservices', component: SubservicesComponent }  // Subservice route
      ] },
      { path: 'projects', component: ProjectsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
  { path: '', redirectTo: '/base/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
