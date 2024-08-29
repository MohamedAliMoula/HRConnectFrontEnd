import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProfilComponent } from './profil/profil.component';
import { ModifiermdpComponent } from './modifiermdp/modifiermdp.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { BlockedComponent } from './blocked/blocked.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SocialProfilComponent } from './social-profil/social-profil.component';
import { StudentListComponent } from './student-list/student-list.component';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['EMPLOYEE', 'ADMIN', 'COMPTABLE','MANAGER'] },
  },
  {
    path: 'profile',
    component: ProfilComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['EMPLOYEE', 'ADMIN', 'COMPTABLE','MANAGER'] },
  },
  {
    path: 'pwd',
    component: ModifiermdpComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['EMPLOYEE', 'ADMIN', 'COMPTABLE','MANAGER'] },
  },
  {
    path: 'userliste',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['EMPLOYEE', 'ADMIN', 'COMPTABLE','MANAGER'] },
  },
  {
    path: 'adduser',
    component: AddUserComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['EMPLOYEE', 'ADMIN', 'COMPTABLE','MANAGER'] },
  },
  { path: 'userblocking', component: BlockedComponent },
  { path: 'accessdenied', component: AccessDeniedComponent },
  {path:'dash',component:DashbordComponent},
  {path:'Socialprofil',component:SocialProfilComponent},
  {path:'listestudent',component:StudentListComponent},

 

  {path:'**',component:HomeComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
