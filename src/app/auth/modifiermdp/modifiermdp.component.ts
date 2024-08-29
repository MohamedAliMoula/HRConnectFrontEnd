import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordRequest } from 'src/app/core/models/ChangePasswordRequest';
import { TfaEnable } from 'src/app/core/models/TfaEnable';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-modifiermdp',
  templateUrl: './modifiermdp.component.html',
  styleUrls: ['./modifiermdp.component.css']
})
export class ModifiermdpComponent {
  changePasswordRequest: ChangePasswordRequest = {};
  tfa: TfaEnable = {};
  user:User;

  constructor(private userService: UserService,
    private toastr: ToastrService,

  ) { }
  ngOnInit(): void {
    this.CurrentUser()

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
  disable2fa(): void {
    this.userService.disable2fa(this.user.id).subscribe(() => {
      this.toastr.success('', 'Success!\n2FA disabled successfully', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-right'
      });    }, error => {
      console.error('Error disabling 2FA:', error);
      // Handle error
    });
  }
  enable2fa(): void {
    this.userService.enable2fa(this.user.id)
    .subscribe({
      next: (response) => {
        this.tfa=response
         this.toastr.success('', 'Success!\n2FA enabled successfully', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right'
        });
      },
      error: (err) => {
        console.error('Error enabling 2FA:', err);
        alert("Error while updating the user!!");
        this.toastr.warning('', 'warning!\nError enabling 2FA', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right'
        });
      }
    });
    
  }
  CurrentUser() {
    this.userService.getCurentUser()
    .subscribe({
      next: (response) => {
        this.user=response;
          console.log(this.user);
          
        },
        error:(err)=>{
          alert("Error while fetching the Records !!")
        } 
       
    });
 
  }
  getAdminPhotoUrl(user: User): string {
    if (user && user.image) {
      return this.userService.getPhoto(user.image);
    } else {
      // Provide a default image URL
      return null;
    }
  }
  
}
