import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:User;

  constructor(private api:AuthenticationService,private userservice: UserService,
    private router:Router
    ){}
    ngOnInit(): void {
      this.CurrentUser()
    }
  logout(){
    this.api.logout()
    this.router.navigate(['/home'])
  }
  CurrentUser() {
    this.userservice.getCurentUser()
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
    return this.userservice.getPhoto(user.image);
  } else {
    // Provide a default image URL
    return null;
  }
}
}
