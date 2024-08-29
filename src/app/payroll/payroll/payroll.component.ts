import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../payroll.service';
import { Payroll } from 'src/app/core/models/Payroll';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  selectedFile: File | null = null;
  employeeId: number | null = null;
  archivedPayrolls: any[] = [];
  payrolls: Payroll[] = [];

  constructor(private payrollService: PayrollService) { }
  ngOnInit(): void {
    this.fetchPayrolls();
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  importPayroll(): void {
    if (this.selectedFile) {
      this.payrollService.importPayroll(this.selectedFile).subscribe(
        response => {
          alert('Payroll imported successfully.');
        },
        error => {
          alert('Failed to import payroll.');
        }
      );
    } else {
      alert('Please select a file first.');
    }
  }

  fetchArchivedPayrolls(): void {
    if (this.employeeId !== null) {
      this.payrollService.getArchivedPayrolls(this.employeeId).subscribe(
        data => {
          this.archivedPayrolls = data;
        },
        error => {
          alert('Failed to fetch archived payrolls.');
        }
      );
    } else {
      alert('Please enter an employee ID.');
    }
  }

  downloadPayroll(payrollId: number): void {
    this.payrollService.downloadPayroll(payrollId);
  }
  fetchPayrolls(): void {
    this.payrollService.getAllPayrolls().subscribe(
      data => {
        this.payrolls = data;
      },
      error => {
        console.error('Error fetching payrolls:', error);
      }
    );
  }
}
