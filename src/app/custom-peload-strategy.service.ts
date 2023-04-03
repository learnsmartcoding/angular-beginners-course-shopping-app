import { Injectable } from '@angular/core';
import { Route, PreloadingStrategy } from '@angular/router';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadStrategy implements PreloadingStrategy {

  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
  // preload(route: Route, fn: () => Observable<any>): Observable<any> {        
  //   const slowNetwork = navigatorWithConnection.connection && ['slow-2g', '2g'].includes(navigatorWithConnection.connection.effectiveType);
    
  //   if (!slowNetwork) {
  //     return of(null);
  //   }
  //   return fn();
  // }
}

interface ExtendedNavigator extends Navigator {
  connection: any;
}
const navigatorWithConnection: ExtendedNavigator = navigator as ExtendedNavigator;