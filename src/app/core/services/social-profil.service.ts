import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialProfil } from '../models/SocialProfil';
import { Observable } from 'rxjs';
import { StudentAbsence } from '../models/StudentAbsence';

@Injectable({
  providedIn: 'root'
})
export class SocialProfilService {
  private apiUrl = 'http://localhost:8090/api/v1/socialprofil';
  private baseUrl = 'https://hq1.appsflyer.com/api/pushapi/v1.0/validate-url'; // Base URL of the Appsflyer API

  constructor(private http: HttpClient) { }

  addSocialprofil(socialprofil: SocialProfil): Observable<SocialProfil> {
    return this.http.post<SocialProfil>(`${this.apiUrl}/add`, socialprofil);
  }
   // Method to fetch data from Appsflyer API
   fetchData(endpoint: string): Observable<any> {
    // Append the endpoint to the base URL
    const url = `${this.baseUrl}/${endpoint}`;
    // You may need to pass headers or query parameters as needed
    return this.http.get(url);
  }

 
}
