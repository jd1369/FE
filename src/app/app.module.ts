import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { AdminComponent } from './base/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatOption} from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddprojectComponent } from './base/admin/addproject/addproject.component';
import { AddserviceComponent } from './base/admin/addservice/addservice.component';
import { AddsubserviceComponent } from './base/admin/addsubservice/addsubservice.component';
import { PostablogComponent } from './base/admin/postablog/postablog.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CustomertableComponent } from './shared/customertable/customertable.component';
import { ProjecttableComponent } from './shared/projecttable/projecttable.component';
import { ServicetableComponent } from './shared/servicetable/servicetable.component';
import { SubservicetableComponent } from './shared/subservicetable/subservicetable.component';
import { BlogtableComponent } from './shared/blogtable/blogtable.component';
import { ServicesComponent } from './base/services/services.component';
import { HomeComponent } from './base/home/home.component';
import { AboutusComponent } from './base/aboutus/aboutus.component';
import { AboutComponent } from './base/about/about.component';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { 
	IgxButtonModule,
	IgxIconModule,
	IgxCardModule,
	IgxRippleModule
 } from "igniteui-angular";
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel'
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContactustableComponent } from './shared/contactustable/contactustable.component';
import { EyepopupComponent } from './shared/eyepopup/eyepopup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { EditprojectComponent } from './shared/projecttable/editproject/editproject.component';
import { EidtblogComponent } from './shared/blogtable/eidtblog/eidtblog.component';
import { ServiceDetailsComponent } from './shared/servicetable/service-details/service-details.component';
import { CamelizePipe } from './shared/servicetable/camelize-pipe.pipe';
import { SubserviceDetailsComponent } from './shared/servicetable/subservice-details/subservice-details.component';
import { SubservicemodalComponent } from './shared/servicetable/subservice-details/subservicemodal/subservicemodal.component';
import { ClientsModule } from "./shared/clients/clients.module";
import {  MatSelectModule } from '@angular/material/select';  // Correct import
import { MatInputModule } from '@angular/material/input';  
import { NgHttpLoaderModule } from 'ng-http-loader'; // <============
import { MatCardModule } from "@angular/material/card";
@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    BaseComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    AddprojectComponent,
    AddserviceComponent,
    AddsubserviceComponent,
    PostablogComponent,
    CustomertableComponent,
    ProjecttableComponent,
    ServicetableComponent,
    SubservicetableComponent,
    BlogtableComponent,
    ServicesComponent,
    HomeComponent,
    AboutusComponent,
    ContactustableComponent,
    EyepopupComponent,
    EditprojectComponent,
    EidtblogComponent,
    ServiceDetailsComponent,
    CamelizePipe,
    SubserviceDetailsComponent,
    SubservicemodalComponent,


  ],
  imports: [
    AccordionModule,
    ButtonModule,
    TagModule,
    BrowserModule,
    NgHttpLoaderModule.forRoot(),// < Loader============ Don't forget to call 'forRoot()'!
    MatListModule,
    CarouselModule,
    MatFormFieldModule,
    MatCardModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 5000, // Default timeout in milliseconds (5 seconds)
      positionClass: 'toast-top-right', // Position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    InputTextModule,
    TableModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Position of the toastr
      timeOut: 3000, // Duration of the toastr in milliseconds
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, HttpClientModule, MatSlideToggleModule,
    ClientsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

