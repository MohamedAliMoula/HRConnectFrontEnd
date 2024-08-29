import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { TfaEnable } from 'src/app/core/models/TfaEnable';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  codeQR:String;
  user:User;
  pieChart: any;
  
  constructor(private userservice: UserService,
    private toastr: ToastrService,

    private http: HttpClient,
    private fb: FormBuilder) { }
    ngOnInit(): void {
      this.CurrentUser()
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
  
  
  updateUser() {
    this.userservice.updateUser(this.user.id,this.user)
      .subscribe({
        next: (updatedUser) => {
          console.log('User updated:', updatedUser);
          this.toastr.success('', 'Success!\nUser updated', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right'
          });
        },
        error: (err) => {
          console.error('Error while updating user:', err);
          alert("Error while updating the user!!");
        }
      });
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.http.post('http://localhost:8090/api/uploadFile', formData, { responseType: 'text' })
            .subscribe({
                next: (response) => {
                    console.log("Uploaded Successfully:", response);
                    let urli= response.split("/");
                    let parts1=urli[urli.length - 1]
                    console.log(parts1);
                    
                    let url = response.substring(40);
                    console.log(url);
                    this.user.image = parts1;
                },
                error: (error) => console.error("Upload Error:", error)
            });
    }
  }


    
  }



