import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from './base.component';
import { AdminComponent } from './admin/admin.component';
import { ServicesComponent } from './services/services.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AboutComponent } from './about/about.component';
import { AppModule } from '../app.module';
import { AgmCoreModule } from '@agm/core';
import { SubservicesComponent } from './services/subservices/subservices.component';
import { BlogComponent } from './blog/blog.component';
import { ProjectdetailsComponent } from './projects/projectdetails/projectdetails.component';
@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,

    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    
    MatTableModule,
    

    MatPaginatorModule,
    MatButtonModule,
    //ClientsComponent,
    MatIconModule,
    MatSlideToggleModule,
        MatSortModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    

    RouterModule.forChild([
      {
        path: '',
        component: BaseComponent,
        children: [
          { path: 'admin', component: AdminComponent },
          { path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) },
          { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
          { path: 'home', component: HomeComponent },
          { path: 'aboutus', component: AboutusComponent },
          { path: 'about', component: AboutComponent },
          { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},
        ],
      },
    ]),
  ]
})
export class BaseModule { }
