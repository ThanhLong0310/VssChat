import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email) {
      console.log('Yêu cầu tìm tài khoản cho:', this.email);
      // Chuyển sang bước 2: Verify OTP
      this.router.navigate(['/verify-otp']); 
    }
  }
}