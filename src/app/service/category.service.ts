import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

/*
1. root mean providing in app module. 
2. You can also provide manually
the difference is, based on where you provide Angular can give instance of that service 
only to those module/components others will not be able to use it.
it is ok to provide at root while creating the service.
there are situation where certain service is restricted to particular component or module
for those case we provide in particular compoennt or their module instead of global/root
*/
@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiUrl;
  }

  getCategories(): Observable<Category[]> {
    const url = `${this.apiURL}/${environment.apiEndpoints.category}/all`;
    return this.getArrary<Category>(url);
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.apiURL}/${environment.apiEndpoints.category}/${id}`;
    return this.get<Category>(url);
  }

  createCategory(model: Category): Observable<any> {
    const url = `${this.apiURL}/${environment.apiEndpoints.category}`;
    return this.http.post(url, model);
  }

  updateCategory(model: Category): Observable<any> {
    const url = `${this.apiURL}/${environment.apiEndpoints.category}`;
    return this.http.put(url, model);
  }

  deleteCategory(id: number): Observable<any> {
    const url = `${this.apiURL}/${environment.apiEndpoints.category}/${id}`;
    return this.http.delete(url);
  }

  //Generic methods for get and get arrary
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

  //common method to handle exception
  private extractData<T>(res: any) {
    if (res && (res.status < 200 || res.status >= 300)) {
      throw new Error('Bad response status: ' + res.status);
    }
    return (res || {}) as T;
  }
}
