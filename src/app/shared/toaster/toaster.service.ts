import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToasterService {
  success(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private toastr: ToastrService) { }

  showSuccessMessage(message: string, p0: string) {
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
