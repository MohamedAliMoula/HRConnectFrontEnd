import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { Payroll } from '../core/models/Payroll';


@Injectable({
  providedIn: 'root'
})
export class PayrollService {


  private apiUrl = 'http://localhost:8081/api/payroll'; // Mettez à jour l'URL de votre API

  constructor(private http: HttpClient) { }
  getAllPayrolls(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(this.apiUrl);
  }
  importPayroll(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/import`, formData, {
      responseType: 'text'
    });
  }

  getArchivedPayrolls(employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/archive/${employeeId}`);
  }

  downloadPayroll(payrollId: number): void {
    this.http.get(`${this.apiUrl}/download/${payrollId}`, { responseType: 'blob' as 'json' }).subscribe((response: any) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const filename = `payroll-${payrollId}.pdf`;
      saveAs(blob, filename); // Utilisation de saveAs
    });
  }
}
