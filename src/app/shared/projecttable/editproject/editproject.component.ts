import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.scss']
})
export class EditprojectComponent implements OnInit {
  @Input() projectData: any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  save() {
    this.activeModal.close(this.projectData);
  }

  close() {
    this.activeModal.dismiss();
  }

}
