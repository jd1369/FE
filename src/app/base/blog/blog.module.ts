import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { RouterModule } from '@angular/router';
import { ClientsModule } from "../../shared/clients/clients.module";



@NgModule({
  declarations: [
    BlogComponent,
    BlogdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '', // Child route
            component: BlogComponent, // Child component
        },
        {
            path: 'blogdetails', // Child route
            component: BlogdetailsComponent, // Child component
        },
    ]),
    ClientsModule
]
})
export class BlogModule { }
