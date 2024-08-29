import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';


declare var bootstrap: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userData: User[] = [];
  searchTerm: string = '';
  selectedUserId: number | null = null;
  action: string = '';

  constructor(private api: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetlistUser();
  }

  get filteredUsers() {
    return this.userData.filter(user => user.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  convertBlockingToBoolean(blockingValue: string): boolean {
    return blockingValue === "true";
  }

  GetlistUser() {
    this.api.GetlistUser()
      .subscribe({
        next: (res) => {
          this.userData = res as User[];
          console.log(this.userData);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  confirmBlockUser(id: number): void {
    this.selectedUserId = id;
    this.action = 'block';
    const modal = new bootstrap.Modal(document.getElementById('blockUserModal') as any);
    modal.show();
  }

  confirmUnblockUser(id: number): void {
    this.selectedUserId = id;
    this.action = 'unblock';
    const modal = new bootstrap.Modal(document.getElementById('unblockUserModal') as any);
    modal.show();
  }

  confirmDeleteUser(id: number): void {
    this.selectedUserId = id;
    this.action = 'delete';
    const modal = new bootstrap.Modal(document.getElementById('deleteUserModal') as any);
    modal.show();
  }

  blockUser(): void {
    if (this.selectedUserId !== null) {
      this.api.bloqueUser(this.selectedUserId)
        .subscribe({
          next: () => {
            this.toastr.success('', 'Success!\nUser blocked', {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-right'
            });
            this.GetlistUser(); // Refresh user list
          },
          error: (err) => {
            console.error('Error blocking user:', err);
          }
        });
    }
  }

  unblockUser(): void {
    if (this.selectedUserId !== null) {
      this.api.debloqueruser(this.selectedUserId)
        .subscribe({
          next: () => {
            this.toastr.success('', 'Success!\nUser unblocked', {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-right'
            });
            this.GetlistUser(); // Refresh user list
          },
          error: (err) => {
            console.error('Error unblocking user:', err);
          }
        });
    }
  }

  deleteUser(): void {
    if (this.selectedUserId !== null) {
      this.api.DeleteUser(this.selectedUserId)
        .subscribe({
          next: () => {
            this.toastr.success('', 'Success!\nUser deleted', {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-right'
            });
            this.GetlistUser(); // Refresh user list
          },
          error: (err) => {
            console.error('Error deleting user:', err);
          }
        });
    }
  }

  filterUserData(): any[] {
    return this.userData.filter(user =>
      user.firstname.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}