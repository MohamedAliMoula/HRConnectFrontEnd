import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddTeleworkComponent } from './telework/add-telework/add-telework.component';
import { ListTeleworkComponent } from './telework/list-telework/list-telework.component';
import { ArchivedTeleworkComponent } from './telework/archived-telework/archived-telework.component';
import { UserTeleworkComponent } from './telework/user-telework/user-telework.component';
import { CongeComponent } from './conge/conge/conge.component';
import { AdminCongeComponent } from './conge/admin-conge/admin-conge.component';
import { AddUserComponent } from './auth/add-user/add-user.component';
import { UserListComponent } from './auth/user-list/user-list.component';
import { SocialProfil } from './core/models/SocialProfil';
import { ProfilComponent } from './auth/profil/profil.component';
import { ModifiermdpComponent } from './auth/modifiermdp/modifiermdp.component';
import { PayrollComponent } from './payroll/payroll/payroll.component';



const routes: Routes = [
   { path: 'auth',
               loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
              { path: 'home',
              component: HomeComponent},
    {path:'addtelework',component:AddTeleworkComponent},
    {path:'liste',component:ListTeleworkComponent},
    {path:'archivedTelework',component:ArchivedTeleworkComponent},
    {path:'userTelework',component:UserTeleworkComponent},
    {path:'adminconge',component:AdminCongeComponent},
    {path:'adduser' , component:AddUserComponent},
    {path:'user-list', component:UserListComponent},
    {path:'conge', component:CongeComponent},
    {path:'admin-conge' , component: AdminCongeComponent},
    {path:'social-profil' , component:SocialProfil},
    {path:'profil' , component:ProfilComponent},
    {path:'modifiermdp' , component:ModifiermdpComponent},
    {path:'payroll' , component:PayrollComponent}

             
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
