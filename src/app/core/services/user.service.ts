import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { RegisterRequest } from '../models/register-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { TfaEnable } from '../models/TfaEnable';
import { SocialProfil } from '../models/SocialProfil';
import { AllUserProfil } from '../models/AllUserProfil';

@Injectable({
  providedIn: 'root',
})
export class UserService  {
  private apiUrl = 'http://localhost:8090/api/v1/users';
  private apiUrlAuth='http://localhost:8090/api/v1/auth';
  private BaseUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }
  changePassword(request: ChangePasswordRequest): Observable<void> {
  
    return this.http.post<void>(`${this.apiUrl}/changepass`,request);
  }
  getPhoto(photo: string): string{
    const photoUrl = `${this.BaseUrl}/download/${photo}`;

    return `${this.BaseUrl}/download/${photo}`;
  }
  getCurentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/curentuser`);
  }

  updateUser(id: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/updateUser/${id}`, updatedUser);
  }
  GetlistUser(): Observable<any> {
    
    return this.http.get<any>(`${this.apiUrl}/allUser`);
  }
  bloqueUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/userBlocking/${id}`, {});
  }
  debloqueruser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/deblocafeuser/${id}`, {});
  }
  DeleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  adduser(
    registerRequest: RegisterRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.apiUrlAuth}/adduser`, registerRequest);
  }
  disable2fa(userId: number): Observable<void> {
    const url = `${this.apiUrl}/disable-2fa/${userId}`;
    return this.http.post<void>(url, null);
  }

  enable2fa(userId: number): Observable<TfaEnable> {
    const url = `${this.apiUrl}/enable-2fa/${userId}`;
    return this.http.post<TfaEnable>(url, null);
  }
  getUsersProfil(role: string): Observable<AllUserProfil[]> {
    const url = `${this.apiUrl}/allUserProfil/${role}`;
    return this.http.get<AllUserProfil[]>(url);
  }
}
