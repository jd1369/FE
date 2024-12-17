import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Show loader for each request
    this.loaderService.showLoader();

    return next.handle(req).pipe(
      finalize(() => {
        // Hide loader when the request is complete
        this.loaderService.hideLoader();
      })
    );
  }
}
