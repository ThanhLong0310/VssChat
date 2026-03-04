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

  constructor(private router: Router) { }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) return;

    // Giả lập xử lý thành công
    console.log('Mật khẩu mới đã được thiết lập');
    alert('Đổi mật khẩu thành công! Bạn sẽ được đưa về trang đăng nhập.');
    this.router.navigate(['/login']);
  }
}