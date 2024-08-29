import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationResponse } from 'src/app/core/models/authentication-response';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  userForm: FormGroup;
  emailQuest:string;
  roles: string[] = ['EMPLOYEE', 'COMPTABLE','MANAGER',];
  authResponse: AuthenticationResponse = {};
  message = '';

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['EMPLOYEE', Validators.required],
      birthday: [new Date(), Validators.required],
      phoneNumber: [null],
      password:[''],
      image: [''],
      ncin: [''],
      company: [''],
      mfaEnabled: [false] // added rememberMe field

    });
  }
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {
  }
  addQuest(): void {
    this.emailQuest=this.userForm.value.email;
    if (this.userForm.invalid) {
      return;
    }

    this.userService.adduser(this.userForm.value)
    .subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success('', 'Success!', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right'
          });          
        } else {
         }
     
        // Reset form after successful submission
        this.userForm.reset();
      },
      error: (error) => console.error("Upload Error:", error)
  });
  }
}
