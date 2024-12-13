import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectdetailsComponent } from 'src/app/base/projects/projectdetails/projectdetails.component';
import { ProjectsComponent } from './projects.component';


@NgModule({
  declarations: [
    ProjectdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectsComponent, // This is the parent component
        children: [
          {
            path: 'projectdetails', // Child route
            component: ProjectdetailsComponent, // Child component
          },
          // Add other child routes here if needed
        ],
      },
    ]),
  ]
})
export class ProjectsModule { }
