import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectdetailsComponent } from 'src/app/base/projects/projectdetails/projectdetails.component';
import { ProjectsComponent } from './projects.component';


@NgModule({
  declarations: [
    ProjectdetailsComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', // Child route
        component: ProjectsComponent, // Child component
      },
      {
        path: 'projectdetails', // Child route
        component: ProjectdetailsComponent, // Child component
      },
    ]),
  ],
  exports: [RouterModule]
})
export class ProjectsModule { }
