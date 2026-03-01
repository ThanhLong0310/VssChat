import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService, User } from '../../userService/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Lấy tham chiếu đến form trong HTML để reset trạng thái (touched, dirty)
  @ViewChild('userForm') userForm!: NgForm;

  // --- STATE VARIABLES ---
  users: User[] = [];
  isLoading: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  // --- FORM VARIABLES ---
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  avatar: string = '';
  editingUserId: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Lấy danh sách người dùng từ API
   */
  loadUsers(): void {
    this.isLoading = true;
    this.errorMsg = ''; // Reset lỗi trước khi gọi API

    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.data || res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách user:', err);
        this.errorMsg = 'Không thể tải danh sách người dùng. Vui lòng thử lại!';
        this.isLoading = false;
      }
    });
  }

  /**
   * Xử lý Submit Form (Thêm mới hoặc Cập nhật)
   */
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.errorMsg = 'Vui lòng điền đầy đủ các trường bắt buộc.';
      return;
    }

    this.isLoading = true;
    const userData = {
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      avatar: this.avatar
    };

    if (this.editingUserId) {
      // Logic Cập nhật
      this.userService.updateUser(this.editingUserId, userData).subscribe({
        next: () => {
          this.handleSuccess('Cập nhật người dùng thành công!');
        },
        error: (err) => this.handleError('Lỗi khi cập nhật user', err)
      });
    } else {
      // Logic Thêm mới
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.handleSuccess('Thêm người dùng thành công!');
        },
        error: (err) => this.handleError('Lỗi khi tạo user', err)
      });
    }
  }

  /**
   * Đổ dữ liệu của user được chọn lên form để chỉnh sửa
   * @param user Đối tượng user cần sửa
   */
  editUser(user: User): void {
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.avatar = user.avatar || '';
    this.editingUserId = user.id ? String(user.id) : null;
    this.errorMsg = '';
    this.successMsg = '';
    
    // Cuộn lên form mượt mà
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Xóa một người dùng theo ID
   * @param id ID của người dùng cần xóa
   */
  deleteUser(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này không? Hành động này không thể hoàn tác.')) {
      this.isLoading = true;
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.handleSuccess('Đã xóa người dùng thành công!');
        },
        error: (err) => this.handleError('Lỗi khi xóa user', err)
      });
    }
  }

  /**
   * Hủy bỏ quá trình chỉnh sửa, đưa form về trạng thái ban đầu
   */
  cancelEdit(): void {
    this.resetForm();
  }

  /**
   * Xử lý khi gọi API thành công
   */
  private handleSuccess(message: string): void {
    this.successMsg = message;
    this.errorMsg = '';
    this.loadUsers();
    this.resetForm();
    
    // Tự động ẩn thông báo thành công sau 3 giây
    setTimeout(() => this.successMsg = '', 3000);
  }

  /**
   * Xử lý khi gọi API thất bại
   */
  private handleError(context: string, err: any): void {
    console.error(`${context}:`, err);
    this.errorMsg = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
    this.isLoading = false;
  }

  /**
   * Xóa trắng form và reset trạng thái Validation
   */
  private resetForm(): void {
    this.editingUserId = null;
    if (this.userForm) {
      this.userForm.resetForm(); // Xóa cả dữ liệu lẫn trạng thái touched/dirty
    }
  }
}