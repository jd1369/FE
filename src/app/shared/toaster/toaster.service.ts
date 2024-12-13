import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToasterService {

  constructor(private toastr: ToastrService) { }

  showSuccessMessage(message : string) {
    this.toastr.success(message, 'Success');
  }

  showInfoMessage(message : string) {
    this.toastr.info(message, 'Info');
  }

  showErrorMessage(message : string) {
    this.toastr.error(message, 'Error');
  }

  showWarningMessage(message : string) {
    this.toastr.warning(message, 'Warning');
  }
}
