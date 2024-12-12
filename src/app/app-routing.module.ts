import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './base/admin/admin.component';
import { BaseComponent } from './base/base.component';
import { HomeComponent } from './base/home/home.component';
import { ServicesComponent } from './base/services/services.component';
import { ProjectsComponent } from './base/projects/projects.component';
import { AboutusComponent } from './base/aboutus/aboutus.component';
import { AboutComponent } from './base/about/about.component';
import { BlogComponent } from './base/blog/blog.component';
import { SubservicesComponent } from './base/subservices/subservices.component';
import { ProjectdetailsComponent } from './base/projectdetails/projectdetails.component';

const routes: Routes = [
  {
    path: 'base',
    component: BaseComponent,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'about', component: AboutComponent },
      { path: 'subservices', component: SubservicesComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'projectdetails', component: ProjectdetailsComponent },
    ],
  },
  { path: '', redirectTo: '/base/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
