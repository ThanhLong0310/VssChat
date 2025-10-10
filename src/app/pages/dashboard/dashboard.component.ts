import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../userService/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  email = '';
  first_name = '';
  last_name = '';
  avatar = '';
  editingUserId: string | null = null;
  errorMsg = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        // Nếu API có data field
        this.users = res.data || res;
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách user:', err);
        this.errorMsg = 'Không thể tải danh sách người dùng.';
      }
    });
  }

  onSubmit(): void {
    const userData = {
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      avatar: this.avatar
    };

    if (this.editingUserId) {
      this.userService.updateUser(this.editingUserId, userData).subscribe({
        next: () => {
          this.loadUsers();
          this.resetForm();
        },
        error: (err) => console.error('Lỗi khi cập nhật user:', err)
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.loadUsers();
          this.resetForm();
        },
        error: (err) => console.error('Lỗi khi tạo user:', err)
      });
    }
  }

  editUser(user: User): void {
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.avatar = user.avatar || '';
    this.editingUserId = user.id ? String(user.id) : null;
  }

  deleteUser(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Lỗi khi xóa user:', err)
      });
    }
  }

  private resetForm(): void {
    this.email = '';
    this.first_name = '';
    this.last_name = '';
    this.avatar = '';
    this.editingUserId = null;
  }
}
