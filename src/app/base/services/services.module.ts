import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubservicesComponent } from './subservices/subservices.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'qualityInspectionDetails',
        loadChildren: () =>
          import('./subservices/subservices.module').then(
            (m) => m.SubservicesModule
          ),
      }
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
    
  ]
})
export class ServicesModule { }
