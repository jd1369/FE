import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { AddsubserviceService } from './addsubservice.service';
@Component({
  selector: 'app-addsubservice',
  templateUrl: './addsubservice.component.html',
  styleUrls: ['./addsubservice.component.scss']
})
export class AddsubserviceComponent implements OnInit {
  data: any;
  subServiceForm!: FormGroup
  additionalFields: { name: string, value: string }[] = []; // Array of name-value pairs

  constructor(private sharedservice: SharedserviceService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private addsubservice:AddsubserviceService
    

  ) { }

  ngOnInit(): void {
    this.sharedservice.data$.subscribe(data => {
      this.data = data;
      console.log('Received data in Component 2:', data);
    });
    this.subServiceForm = this.fb.group({
      name: [''],
      image: [''],
      fields: this.fb.array([]), // Initialize the form array for fields
    });
  }

  addField() {
    const fieldName = `additionalProp${this.additionalFields.length + 1}`;
    const field = { name: fieldName, value: 'new' };

    this.additionalFields.push(field);
    const fieldsControl = this.subServiceForm.get('fields') as FormArray;
    fieldsControl.push(this.fb.group({
      [fieldName]: this.fb.group({
        type: ['new']
      })
    }));
  }

  removeField(index: number) {
    const fieldName = this.additionalFields[index].name;

    this.additionalFields.splice(index, 1);
    const fieldsControl = this.subServiceForm.get('fields') as FormArray;
    fieldsControl.removeAt(index);
  }

  onSubmit(){
    if (this.subServiceForm.valid) {
      const formData: any = { ...this.subServiceForm.value };
  
     
      const fieldsData = this.additionalFields.reduce((acc: { [key: string]: any }, field) => {
        acc[field.name] = { type: field.value }; 
        return acc;
      }, {});
      formData.fields = fieldsData;
      this.addsubservice.addSubService(formData).subscribe({
        next: (response: any) => {
          console.log('Project added successfully:', response);
        },
        error: (err: any) => {
          console.error('Error adding project:', err);
        },
      });
  }



}

}