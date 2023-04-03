import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
  UpdateProductImageModel(file: FormData, id: number): Observable<any> {    
    //const url = 'https://localhost:7044/api/Account';
    const url = `${this.apiUrl}/${environment.apiEndpoints.product}/${id}`;
    return this.http.put(url, file);
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
}
