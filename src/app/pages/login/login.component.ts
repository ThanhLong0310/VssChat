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
  // Lấy tham chiếu đến form để thao tác validation
  @ViewChild('loginForm') loginForm!: NgForm;

  // --- DỮ LIỆU FORM ---
  email: string = '';
  password: string = '';
  rememberMe: boolean = false; // Thêm chức năng ghi nhớ
  
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
  ) {}

  /**
   * Chuyển đổi trạng thái hiển thị mật khẩu
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Xử lý sự kiện khi người dùng bấm Đăng nhập
   */
  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMsg = '';

    // 1. Kiểm tra validation của HTML Form
    if (this.loginForm.invalid) {
      return; 
    }

    // 2. Kiểm tra số lần nhập sai
    if (this.failedAttempts >= this.MAX_ATTEMPTS) {
      this.errorMsg = 'Bạn đã nhập sai quá 5 lần. Vui lòng thử lại sau.';
      return;
    }

    // 3. Thực hiện gọi API
    this.performLogin();
  }

  /**
   * Gọi API Đăng nhập
   */
  private performLogin(): void {
    this.isLoading = true; // Bật trạng thái loading (khóa nút bấm)

    const loginData = {
      email: this.email,
      password: this.password
    };

    // LƯU Ý: Trong dự án thực tế, bạn nên chuyển đoạn this.http.post này sang AuthService
    this.http.post('https://68c3cd8a81ff90c8e61a1881.mockapi.io/users/user', loginData)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          
          // Giả lập lưu token nếu có (res.token)
          // localStorage.setItem('token', res.token);
          
          // Chuyển hướng thành công
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          this.isLoading = false;
          this.failedAttempts++;
          this.errorMsg = `Sai tài khoản hoặc mật khẩu! (Lần ${this.failedAttempts}/${this.MAX_ATTEMPTS})`;
          console.error('Lỗi đăng nhập:', err);
        }
      });
  }
}