
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterFormComponent {
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  company: string = '';
  country: string = '';
  field: string = '';
  position: string = '';
  purpose: string = '';

  errorMsg: string = '';
  successMsg: string = '';

  // ✅ Hàm kiểm tra email hợp lệ
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.first_name || !this.last_name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Vui lòng điền đầy đủ thông tin bắt buộc.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMsg = 'Email không đúng định dạng!';
      return;
    }

    if (this.password.length < 6) {
      this.errorMsg = 'Mật khẩu phải có ít nhất 6 ký tự!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Mật khẩu xác nhận không khớp!';
      return;
    }

    // ✅ Nếu mọi thứ hợp lệ
    this.successMsg = 'Đăng ký thành công!';
    this.errorMsg = '';

    // In ra console (hoặc sau này có thể gọi API)
    console.log({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      company: this.company,
      country: this.country,
      field: this.field,
      position: this.position,
      purpose: this.purpose
    });

    // Reset form
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.company = '';
    this.country = '';
    this.field = '';
    this.position = '';
    this.purpose = '';
  }
}
import { Component } from '@angular/core';