import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SiteUser } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  public userName='admin';
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  GetUsers(): Observable<SiteUser[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.users}`;
    return this.getArrary<SiteUser>(url);
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
