import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  newPassword = '';
  confirmPassword = '';
  
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(private router: Router) {}

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    
    // Logic gọi API đổi mật khẩu ở đây
    console.log('Đổi mật khẩu thành công:', this.newPassword);
    
    alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
    this.router.navigate(['/login']);
  }
}