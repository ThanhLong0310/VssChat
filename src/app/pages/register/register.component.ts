import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterFormComponent {
  // Khai báo biến binding với form
  last_name: string = '';
  first_name: string = '';
  email: string = '';
  company: string = '';
  country: string = '';
  field: string = '';
  position: string = '';
  purpose: string = '';

  // Biến cờ để kiểm tra xem người dùng đã bấm nút Submit chưa
  isSubmitted: boolean = false;

  onSubmit(form: NgForm) {
    this.isSubmitted = true; // Đánh dấu là đã bấm nút

    if (form.valid) {
      // Nếu form hợp lệ hết thì mới xử lý
      console.log('Form hợp lệ, dữ liệu:', form.value);
      alert('Đăng ký thành công!'); 
      // Tại đây bạn gọi API về server
    } else {
      console.log('Form chưa hợp lệ, vui lòng kiểm tra lại.');
    }
  }
} 