import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Tùy chọn: dùng để chuyển trang sau khi đăng ký

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterFormComponent {
  // Tham chiếu tới #registerForm trong HTML để thao tác validation
  @ViewChild('registerForm') registerForm!: NgForm;

  // --- DỮ LIỆU FORM ---
  last_name: string = '';
  first_name: string = '';
  email: string = '';
  company: string = '';
  country: string = '';
  field: string = '';
  position: string = '';
  purpose: string = '';

  // --- TRẠNG THÁI GIAO DIỆN ---
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private router: Router) { }

  /**
   * Xử lý sự kiện khi người dùng bấm Đăng ký
   */
  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMsg = '';
    this.successMsg = '';

    // Kiểm tra xem các trường bắt buộc đã được điền đúng chưa
    if (this.registerForm.invalid) {
      this.errorMsg = 'Vui lòng kiểm tra lại các trường thông tin bị lỗi.';
      return;
    }

    // Nếu form hợp lệ, tiến hành gọi API
    this.performRegistration();
  }

  /**
   * Giả lập quá trình gọi API đăng ký tài khoản
   */
  private performRegistration(): void {
    this.isLoading = true; // Khóa nút bấm

    // Tạo payload chuẩn bị gửi đi
    const payload = {
      last_name: this.last_name,
      first_name: this.first_name,
      email: this.email,
      company: this.company,
      country: this.country,
      field: this.field,
      position: this.position,
      purpose: this.purpose
    };

    console.log('Đang gửi dữ liệu đăng ký:', payload);

    // --- Giả lập gọi API bằng setTimeout (thay bằng HttpClient thực tế) ---
    setTimeout(() => {
      this.isLoading = false;
      this.successMsg = 'Đăng ký thành công! Đang chuyển hướng...';

      // Chuyển về trang đăng nhập sau 2 giây
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

    }, 1500);
  }
}