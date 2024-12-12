import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditprojectService } from './editproject.service';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.scss']
})
export class EditprojectComponent implements OnInit {
  @Input() projectData :any
  constructor(public activeModal: NgbActiveModal,
    private editService :EditprojectService
  ) { }

  ngOnInit(): void {
    this.projectData.lastModifiedDate = new Date().toISOString();
  }

  save() {
    console.log(this.projectData)
    this.editService.saveProject(this.projectData).subscribe({
      next:(response:any) => {
        console.log('Project saved successfully:', response);
        
        this.activeModal.close(this.projectData);
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
