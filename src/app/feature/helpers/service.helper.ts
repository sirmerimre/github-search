import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

export class ServiceHelper {

  public static handleError(error: HttpErrorResponse) {
    let errorMessage = 'General error';
    if (error.status) {
      if (error.status === 422) {
        errorMessage = 'Validation Error';
      } else if (error.status === 400) {
        errorMessage = 'Invalid Json Object';
      }
      return throwError(
        errorMessage);
    } else {
      return throwError(errorMessage);
    }
  }
}
