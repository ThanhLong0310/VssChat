  import { Component, ViewChild } from '@angular/core';
  import { Router } from '@angular/router';
  import { HttpClient } from '@angular/common/http';
  import { NgForm } from '@angular/forms'; // Import NgForm

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent {
    @ViewChild('loginForm') loginForm!: NgForm; // Để truy cập form từ TS

    email: string = '';
    password: string = '';
    showPassword: boolean = false;
    
    // Logic validate
    isSubmitted = false; // Biến cờ để biết đã bấm submit chưa
    errorMsg: string = '';
    failedAttempts: number = 0;
    MAX_ATTEMPTS: number = 5;

    constructor(private router: Router, private http: HttpClient) {}

    togglePassword() {
      this.showPassword = !this.showPassword;
    }

    onSubmit() {
      // 1. Đánh dấu là đã submit để HTML hiển thị lỗi đỏ nếu có
      this.isSubmitted = true;

      // 2. Kiểm tra nếu form Angular không hợp lệ (trường required bị trống)
      if (this.loginForm.invalid) {
        return; 
      }

      // 3. Reset thông báo lỗi API cũ
      this.errorMsg = '';

      // ... (Giữ nguyên logic kiểm tra logic nghiệp vụ của bạn) ...
      if (this.failedAttempts >= this.MAX_ATTEMPTS) {
        this.errorMsg = 'Bạn đã nhập sai quá 5 lần.';
        return;
      }

      // 🔹 Gọi API login (Giữ nguyên code của bạn)
      this.http.post('https://68c3cd8a81ff90c8e61a1881.mockapi.io/users/user', {
        email: this.email,
        password: this.password
      }).subscribe({
        next: (res: any) => {
          // ... logic thành công
          this.router.navigate(['/dashboard']); 
        },
        error: () => {
          // ... logic thất bại
          this.failedAttempts++;
          this.errorMsg = 'Sai tài khoản hoặc mật khẩu!';
        }
      });
    }
  }