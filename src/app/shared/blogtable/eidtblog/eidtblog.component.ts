import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditprojectService } from '../../projecttable/editproject/editproject.service';
import { EidtblogService } from './eidtblog.service';

@Component({
  selector: 'app-eidtblog',
  templateUrl: './eidtblog.component.html',
  styleUrls: ['./eidtblog.component.scss']
})
export class EidtblogComponent implements OnInit {
  @Input() blogData :any
  constructor(public activeModal: NgbActiveModal,
    private editBlog :EidtblogService
  ) { }

  ngOnInit(): void {
    this.blogData.lastModifiedDate = new Date().toISOString();
  }

  save() {
    console.log(this.blogData)
    this.editBlog.saveBlog().subscribe({
      next:(response:any) => {
        console.log('Project saved successfully:', response);
        
        this.activeModal.close(this.blogData);
      },
      error:(err:any) => {
        console.error('Error saving project:', err);
        // Handle the error (e.g., show an error message)
      }
   });
  }

  close() {
    this.activeModal.dismiss();
  }

}
