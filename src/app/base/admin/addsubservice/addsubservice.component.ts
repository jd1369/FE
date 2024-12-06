import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-addsubservice',
  templateUrl: './addsubservice.component.html',
  styleUrls: ['./addsubservice.component.scss']
})
export class AddsubserviceComponent implements OnInit {
  projectForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
  }

}
