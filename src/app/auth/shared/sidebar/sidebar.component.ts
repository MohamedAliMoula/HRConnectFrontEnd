import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
  user:User;

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.CurrentUser()

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
