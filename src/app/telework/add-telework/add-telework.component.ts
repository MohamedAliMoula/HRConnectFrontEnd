import { Component, OnInit } from '@angular/core';
import { TeleworkService } from '../telework.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-add-telework',
  templateUrl: './add-telework.component.html',
  styleUrls: ['./add-telework.component.css']
})
export class AddTeleworkComponent implements OnInit{
  user:User;
ngOnInit(): void {
  this.CurrentUser();
}
  telework = {
    userId: null,
    startDate: '',
    endDate: '',
    numberOfDays:0,
    reason: '',
    status:'PENDING'
  };

  constructor(private teleworkService: TeleworkService,private userservice: UserService) {}
  CurrentUser() {
    this.userservice.getCurentUser()
    .subscribe({
      next: (response) => {
        this.user=response;
          console.log(this.user);
          this.telework.userId = this.user.id; // Assigner l'ID de l'utilisateur au telework

        },
        error:(err)=>{
        } 
       
    });
 
  }
  formSubmitted = false;
  calculateNumberOfDays() {
    const start = new Date(this.telework.startDate);
    const end = new Date(this.telework.endDate);
    if (start && end && end >= start) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      this.telework.numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end date
    } else {
      this.telework.numberOfDays = 0; // Reset to 0 if dates are invalid
    }
  }
  onSubmit() {
    this.formSubmitted = true;

    // Perform form submission logic here
    if (this.telework.userId && this.telework.startDate && this.telework.endDate && this.telework.reason 
    ) {
      console.log('Form Submitted', this.telework);
      // Implement your submit logic
      this.teleworkService.saveRequest(this.telework)
      .subscribe({
        next: (response) => {
          console.log('Telework request submitted successfully', response);
          // Handle success (e.g., show a success message or redirect)
        },
        error: (err) => {
          console.error('Error submitting telework request', err);
          // Handle error (e.g., show an error message)
        }
      });

    }
  }
 
}
