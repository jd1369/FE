import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SubservicesComponent } from './subservices/subservices.component';
import { ServicesComponent } from './services.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ServicesComponent, // This is the parent component
        children: [
          {
            path: 'subservices', // Child route
            component: SubservicesComponent, // Child component
          },
          // Add other child routes here if needed
        ],
      },
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
    
  ]
})
export class ServicesModule { }
