import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// 1. Import AppRoutingModule (File bạn vừa sửa ở bước 1)
import { AppRoutingModule } from './app-routing.module'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterFormComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

// XÓA: const routes: Routes = [...]  <-- Xóa đoạn này đi để không bị trùng

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterFormComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule // <--- 2. Thêm cái này vào imports thay cho RouterModule.forRoot(...)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }