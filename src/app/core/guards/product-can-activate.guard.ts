import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { UsersService } from 'src/app/service/users.service';

@Injectable({ providedIn: 'root' })
export class ProductCreateGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkUserAccess();
  }

  checkUserAccess() {
    return this.userService.GetUsers().pipe(
      map((data) => {
        if (data.find((d) => d.userId === 'admin')?.hasAccess) {
          return true;
        } else {
          this.toastr.warning(
            'You do not have access to create product',
            'Access denied'
          );
          this.router.navigateByUrl('/products');
          return false;
        }
      })
    );
  }
}
