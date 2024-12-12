import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  private dataSubject = new BehaviorSubject<any>(null);
  private blogdataSubject = new BehaviorSubject<any>(null);
  private projectdataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
  blogdata$ = this.blogdataSubject.asObservable();
  projectdata$ = this.projectdataSubject.asObservable();
  setData(data: any) {
    this.dataSubject.next(data);
  }

  setblogdata(data:any){
    this.blogdataSubject.next(data)
  }

  setProjectData(data:any){
    this.projectdataSubject.next(data)
  }
}