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
    // Fake logic: Nhập gì cũng đúng
    if (this.otpCode) {
      alert('Xác thực thành công!');
      this.router.navigate(['/reset-password']); 
    }
  }

  resend() {
    alert('Đã gửi lại mã OTP!');
  }
}