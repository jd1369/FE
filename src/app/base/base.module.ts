import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from './base.component';
import { AdminComponent } from './admin/admin.component';
import { ServicesComponent } from './services/services.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AboutComponent } from './about/about.component';
import { AppModule } from '../app.module';
import { ClientsComponent } from '../shared/clients/clients.component';
import { SubservicesComponent } from './services/subservices/subservices.component';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // Replace with your API key
    }),
    
    MatPaginatorModule,
    MatButtonModule,
    //ClientsComponent,
    MatIconModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    AppModule,
    RouterModule.forChild([
      {
        path: '',
        component: BaseComponent,
        children: [
          { path: 'admin', component: AdminComponent },
          { path: 'services', component: ServicesComponent,children:[
            {
              path: 'subservices', component: SubservicesComponent
            }
          ] },
          { path: 'projects', component: ProjectsComponent },
          { path: 'home', component: HomeComponent },
          { path: 'aboutus', component: AboutusComponent },
          { path: 'about', component: AboutComponent },
        ],
      },
    ]),
  ]
})
export class BaseModule { }
