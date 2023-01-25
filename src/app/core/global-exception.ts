import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor() { }

    handleError(error: any): void {
        //TO DO - Log error to API for analysis
        alert('Error occured and caught in GlobalErrorHandler. Log this info to API for analysis');
       console.error(error);
    }
    
}