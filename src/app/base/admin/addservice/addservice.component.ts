import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.scss']
})
export class AddserviceComponent implements OnInit {
  projectForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
  }

}
