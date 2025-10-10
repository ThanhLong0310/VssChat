import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  failedAttempts: number = 0;
  MAX_ATTEMPTS: number = 5;
  errorMsg: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  onSubmit() {
    this.errorMsg = '';

    if (this.failedAttempts >= this.MAX_ATTEMPTS) {
      this.errorMsg = 'Bạn đã nhập sai quá 5 lần.';
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

    // 🔹 Gọi API login thật
    this.http.post('https://mockapi.io/clone/68c3cd8a81ff90c8e61a1882', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token); 
        this.router.navigate(['/dashboard']); 
      },
      error: () => {
        this.failedAttempts++;
        const remaining = this.MAX_ATTEMPTS - this.failedAttempts;
        this.errorMsg = `Sai tài khoản hoặc mật khẩu! Còn lại ${remaining} lần thử.`;
      }
    });
  }
}
