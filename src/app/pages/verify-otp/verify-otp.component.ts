import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
  otpCode: string = '';

  constructor(private router: Router) {}

  onVerify() {
    if (this.otpCode.length === 6) {
      console.log('Mã OTP đã nhập:', this.otpCode);
      this.router.navigate(['/reset-password']); 
    }
  }

  resend() {
    console.log('Đã gửi lại mã OTP!');
    alert('Một mã OTP mới đã được gửi đến email của bạn.');
  }
}