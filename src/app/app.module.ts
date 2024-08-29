import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AddTeleworkComponent } from './telework/add-telework/add-telework.component';
import { ListTeleworkComponent } from './telework/list-telework/list-telework.component';
import { ArchivedTeleworkComponent } from './telework/archived-telework/archived-telework.component';
import { UserTeleworkComponent } from './telework/user-telework/user-telework.component';
import { NavbarComponent } from './auth/shared/navbar/navbar.component';
import { CongeComponent } from './conge/conge/conge.component';
import { AdminCongeComponent } from './conge/admin-conge/admin-conge.component';
import { PayrollComponent } from './payroll/payroll/payroll.component';



export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AddTeleworkComponent,
    ListTeleworkComponent,
    ArchivedTeleworkComponent,
    UserTeleworkComponent,
    CongeComponent,
    AdminCongeComponent,
    PayrollComponent,
    
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    CommonModule,

    AuthModule,
    CoreModule,
    
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates :true,
      enableHtml: true,
    }),ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:8082'], 
        disallowedRoutes: ['http://localhost:8082/api/v1/auth/authenticate','http://localhost:8082/api/auth/register','http://localhost:8082/api/v1/users/alluser'], 
      }
    })
  ],
  providers: [],

  // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  bootstrap: [AppComponent]
})
export class AppModule { }
