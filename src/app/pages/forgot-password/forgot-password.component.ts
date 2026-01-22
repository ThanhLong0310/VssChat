import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 1. Import Router

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';

  // 2. Tiêm Router vào constructor
  constructor(private router: Router) {}

  onSubmit() {
    console.log('Đang fake gửi mail cho:', this.email);
    
    // Vì đang làm Mock/Fake, chúng ta cho hiện thông báo rồi chuyển trang luôn
    alert('Hệ thống Mock: Đã gửi mã xác nhận giả lập!');
    
    // 3. Điều hướng sang trang nhập mã (đường dẫn đã khai báo trong AppModule)
    this.router.navigate(['/verify-otp']); 
  }
}