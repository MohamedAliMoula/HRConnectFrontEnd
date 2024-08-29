import { Component } from '@angular/core';
import { ChangePasswordRequest } from 'src/app/core/models/ChangePasswordRequest';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  
  changePasswordRequest: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: '',
    confirmationPassword: ''
  };

  constructor(private userService: UserService) { }
  ngOnInit(): void {
  }
  changePassword(): void {
    console.log(this.changePasswordRequest);
    
    // Check if newPassword and confirmationPassword match
    if (this.changePasswordRequest.newPassword !== this.changePasswordRequest.confirmationPassword) {
      console.error('New password and confirmation password do not match.');
      return; // Exit the method if passwords do not match
    }

    this.userService.changePassword(this.changePasswordRequest)
    .subscribe({
      next: (res) => {
        console.log(res);
        
      },
      error: (err) => {
        console.error('Error pwd change:', err);
        // Gérer les erreurs de suppression, afficher un message à l'utilisateur, etc.
      }
    });
  }
  
}
