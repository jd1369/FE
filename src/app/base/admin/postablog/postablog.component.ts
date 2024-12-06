import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-postablog',
  templateUrl: './postablog.component.html',
  styleUrls: ['./postablog.component.scss']
})
export class PostablogComponent implements OnInit {
  projectForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
  }

}
