import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, map } from "rxjs";
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  GetProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.product}/${id}`;
    return this.get<Product>(url);
  }

  CatchErrorExample(noOfProducts: number = 500): Observable<Product[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.product}/all?noOfProducts=${noOfProducts}`;
    return this.http.get<Product[]>(url).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  
  GetProducts(noOfProducts: number = 500): Observable<Product[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.product}/all?noOfProducts=${noOfProducts}`;
    return this.getArrary<Product>(url);
  }

  GetProductsByOwner(): Observable<Product[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.product}/productsByOwner/all`;
    return this.getArrary<Product>(url);
  }

  CreateProduct(model: Product): Observable<any> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.product}`;
    //throw Error('unhandled exception');//can happen 500 error from server as well. Example to see how it works
    return this.http.post(url,model);
  }

  UpdateProduct(model: Product): Observable<any> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.product}`;
    return this.http.put(url,model);
  }
  
  UploadProductImage(file: FormData, id: number): Observable<any> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.product}/upload/${id}`;
    return this.http.post(url, file);
  }

  DeleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.product}/${id}`;
    return this.http.delete(url);
  }
  

  private get<T>(url: string, options?: any): Observable<T> {
    return this.http
      .get(url, options)
      .pipe(map((res) => this.extractData<T>(res))) as Observable<T>;
  }
  private getArrary<T>(url: string, options?: any): Observable<T[]> {
    return this.http
      .get(url, options)
      .pipe(map((res) => this.extractData<T[]>(res))) as Observable<T[]>;
  }

  private extractData<T>(res: any) {
    if (res && (res.status < 200 || res.status >= 300)) {
      throw new Error('Bad response status: ' + res.status);
    }
    return (res || {}) as T;
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
