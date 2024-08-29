import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeleworkService {

  private apiUrl = 'http://localhost:8090/api/telework'; // Change to your backend URL

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  saveRequest(telework: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, telework);
  }

  acceptRequest(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/accepterTelework/${id}`, {});
  }

  rejectRequest(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/refuserTelework/${id}`, {});
  }
  getArchivedRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/archived`);
  }

  getRequestsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}
