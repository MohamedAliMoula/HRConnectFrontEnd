import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AllUserProfil } from 'src/app/core/models/AllUserProfil';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{
  user:User;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number;
  totalPages: number;
  allUserProfiles: AllUserProfil[] = [];

  constructor(private userService: UserService) { }
  role="STUDENT"

  ngOnInit(): void {
    this.allStudent();

  }
  

  allStudent() {
    this.userService.getUsersProfil(this.role)
    .subscribe({
      next: (response) => {
        this.allUserProfiles = response;
        console.log(this.allUserProfiles);
        this.totalItems = this.allUserProfiles.length;

          
        },
        error:(err)=>{

        } 
       
    });
  }
  getPaginatedStudents(): AllUserProfil[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.allUserProfiles.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPaginationRange(): number[] {
    const range = [];
    for (let i = 1; i <= this.totalPages; i++) {
      range.push(i);
    }
    return range;
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > this.totalItems ? this.totalItems : endIndex;
  }
  getAdminPhotoUrl(user: AllUserProfil): string {
    if (user && user.image) {
      return this.userService.getPhoto(user.image);
    } else {
      // Provide a default image URL
      return null;
    }
  }
}
