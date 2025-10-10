import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterFormComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },             // Trang mặc định
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // cần cho [(ngModel)]
    RouterModule.forRoot(routes) // chỉ import 1 lần duy nhất
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
