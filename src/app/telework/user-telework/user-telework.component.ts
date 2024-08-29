import { Component, Input } from '@angular/core';
import { TeleworkService } from '../telework.service';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-telework',
  templateUrl: './user-telework.component.html',
  styleUrls: ['./user-telework.component.css']
})
export class UserTeleworkComponent {
  user:User;
  

   userId: number;
    userRequests: any[] = [];

  constructor(private teleworkService: TeleworkService,private userservice: UserService) {}

  ngOnInit() {
    this.getCurrentUserAndFetchRequests();


  }
  getCurrentUserAndFetchRequests() {
    this.userservice.getCurentUser().subscribe({
      next: (response) => {
        this.user = response;
        this.userId = this.user.id;
        this.fetchUserRequests();
      },
      error: (err) => {
        alert("Error while fetching the Records !!");
      }
    });
  }

  fetchUserRequests() {
    this.teleworkService.getRequestsByUserId(this.userId).subscribe(data => {
      this.userRequests = data;
    });
  }

}
