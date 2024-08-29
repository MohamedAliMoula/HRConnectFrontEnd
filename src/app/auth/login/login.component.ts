import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/core/models/authentication-request';
import { AuthenticationResponse } from 'src/app/core/models/authentication-response';
import { VerificationRequest } from 'src/app/core/models/verification-request';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse = {};

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  authenticate() {
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          console.log(this.authResponse);

          if (!this.authResponse.mfaEnabled) {
            console.log(response);
            
            localStorage.setItem('token', response.accessToken as string);
            localStorage.setItem('role', response.role as string);
            sessionStorage.setItem("username", response.firstName as string);

            if(response.blocking==true){
              this.router.navigate(['/userblocking'])
            }else{
              if (!this.authResponse) {
                
              }
              localStorage.setItem('token', response.accessToken as string);
              localStorage.setItem('role', response.role as string);
              sessionStorage.setItem("username", response.firstName as string);

              this.router.navigate(['/profile']);
            }
          }
        }
      });
  }

  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCodeUser(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken as string);
          localStorage.setItem('role', response.role as string);
          sessionStorage.setItem("username", response.firstName as string);

          this.router.navigate(['profile']);
        }
      });
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}

