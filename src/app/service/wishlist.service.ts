import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { WishListItem } from '../models/wishlist';

@Injectable({ providedIn: 'root' })
export class WishListService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  GetWishLists(): Observable<WishListItem[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.wishlist}/all`;
    return this.getArrary<WishListItem>(url);
  }

  CreateWishLists(model: WishListItem): Observable<any> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.wishlist}`;
    return  this.http.post(url,model);
  }

  DeleteWishList(id: number): Observable<any> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.wishlist}/${id}`;
    return  this.http.delete(url);
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
