import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Lấy tham chiếu đến form từ HTML
  @ViewChild('loginForm') loginForm!: NgForm;

  // --- DỮ LIỆU FORM ---
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  // --- TRẠNG THÁI GIAO DIỆN ---
  showPassword: boolean = false;
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMsg: string = '';

  // --- BẢO MẬT ---
  failedAttempts: number = 0;
  readonly MAX_ATTEMPTS: number = 5;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  /**
   * Chuyển đổi trạng thái hiển thị mật khẩu (ẩn/hiện)
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Xử lý khi bấm nút Đăng nhập
   */
  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMsg = '';

    // 1. Kiểm tra validation của Angular (required, email, minlength...)
    if (this.loginForm.invalid) {
      return;
    }

    // 2. Kiểm tra nếu đã nhập sai quá số lần quy định
    if (this.failedAttempts >= this.MAX_ATTEMPTS) {
      this.errorMsg = 'Bạn đã nhập sai quá 5 lần. Vui lòng thử lại sau.';
      return;
    }

    // 3. Thực hiện kiểm tra tài khoản
    this.performLogin();
  }

  /**
   * Logic kiểm tra đăng nhập thực tế với MockAPI
   */
  private performLogin(): void {
    this.isLoading = true;

    // Sử dụng GET để lấy danh sách user về so sánh (MockAPI POST luôn trả về 201 thành công)
    this.http.get<any[]>('https://68c3cd8a81ff90c8e61a1881.mockapi.io/users/user')
      .subscribe({
        next: (users) => {
          this.isLoading = false;

          // Tìm user khớp cả Email và Password trong danh sách trả về
          const userFound = users.find(u => u.email === this.email && u.password === this.password);

          if (userFound) {
            console.log('Đăng nhập thành công:', userFound);

            // Lưu thông tin đăng nhập (Tùy chọn)
            if (this.rememberMe) {
              localStorage.setItem('currentUser', JSON.stringify(userFound));
            }

            // Chuyển hướng vào trang chính
            this.router.navigate(['/dashboard']);
          } else {
            // Không tìm thấy user khớp thông tin
            this.handleFailedLogin();
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = 'Lỗi kết nối máy chủ. Vui lòng kiểm tra lại đường truyền.';
          console.error('API Error:', err);
        }
      });
  }

  /**
   * Xử lý khi sai thông tin
   */
  private handleFailedLogin(): void {
    this.failedAttempts++;
    this.errorMsg = `Sai tài khoản hoặc mật khẩu! (Lần ${this.failedAttempts}/${this.MAX_ATTEMPTS})`;
    this.password = '';
    this.isSubmitted = false;
  }
}