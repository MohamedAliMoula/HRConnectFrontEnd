import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{
  constructor(private authService: AuthenticationService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return false;
    }
 
    const expectedRoles = next.data['expectedRoles']; // Use 'expectedRoles' instead of 'expectedRole'
  const userRole = this.authService.getUserRole(); // Implement this method in your authentication service

  if (!expectedRoles.includes(userRole)) {
    this.router.navigate(['/accessdenied']);
    return false;
  }

  return true;
}
}





//   const router = inject(Router);
//   const expectedRoles = next.data['expectedRoles'];
//   if (!localStorage.getItem('token')) {
//     router.navigate(['login']);
//     return false;
//   }
//   return true;
// };
