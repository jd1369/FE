import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicetableService } from '../servicetable.service'; // Import service for API calls
import { ServiceDetailsService } from './service-details.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  @Input() projectData: any;
  iconUrl: string | undefined;
  serviceImageUrl: string | undefined;
serviceId:any
  constructor(
    public modal: NgbActiveModal,
    private detailsserver: ServiceDetailsService
  ) {}

  ngOnInit(): void {
    // Initialize URLs for file previews
    if (this.projectData.icon && this.projectData.icon[0]) {
      this.iconUrl = this.projectData.icon[0];
    }
    if (this.projectData.serviceImage && this.projectData.serviceImage[0]) {
      this.serviceImageUrl = this.projectData.serviceImage[0];
    }
  }

  // Handle file change for icon and serviceImage
  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'icon') {
      this.iconUrl = URL.createObjectURL(file); // Show preview
      this.projectData.icon = [file]; // Assign the file to the project data
    } else if (type === 'serviceImage') {
      this.serviceImageUrl = URL.createObjectURL(file); // Show preview
      this.projectData.serviceImage = [file]; // Assign the file to the project data
    }
  }

  // Add a new key-value pair to the fields
  addNewKeyValue() {
    this.projectData.fields.additionalProps.push({ key: '', value: '' });
  }

  // Delete a key-value pair by index
  deleteKeyValue(index: number) {
    this.projectData.fields.additionalProps.splice(index, 1);
  }

  // Handle the form submission
  onSubmit() {
    // First, update the static fields (name, icon, serviceImage) using one API call
    this.detailsserver.updateStaticFields(this.projectData).subscribe({
      next: (response: any) => {
        console.log('Static fields updated successfully', response);
        
        // Now, update the dynamic key-value fields using another API call
        this.detailsserver.updateDynamicFields(this.serviceId,this.projectData.fields.additionalProps).subscribe({
          next: (response: any) => {
            console.log('Dynamic fields updated successfully', response);
            this.modal.close('Save clicked');
          },
          error: (err: any) => {
            console.error('Error updating dynamic fields', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Error updating static fields', err);
      }
    });
  }
}
