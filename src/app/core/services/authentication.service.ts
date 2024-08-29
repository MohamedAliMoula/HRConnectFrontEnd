import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../models/register-request";
import {AuthenticationResponse} from "../models/authentication-response";
import {VerificationRequest} from "../models/verification-request";
import {AuthenticationRequest} from "../models/authentication-request";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private baseUrl = 'http://localhost:8090/api/v1/auth'
  
  accessToken: any;
  refreshToken: any;
  constructor(
    private http: HttpClient,
    private router:Router
  ) {
    this.accessToken=localStorage.getItem('token')
   }

  register(
    registerRequest: RegisterRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/register`, registerRequest);
  }

  login(
    authRequest: AuthenticationRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/authenticate`, authRequest);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/verify`, verificationRequest);
  }
  verifyCodeUser(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/verifyuser`, verificationRequest);
  }
  getUserRole(): string {
    const userRole = localStorage.getItem('role');
    return userRole ? userRole : ''; 
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }


}
