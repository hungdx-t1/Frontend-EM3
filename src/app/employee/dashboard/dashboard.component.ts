import { Component, OnInit } from '@angular/core';
import { Employee } from '../../core/models/employee.model';
import { Salary } from '../../core/models/salary.model';
import { Attendance } from '../../core/models/attendance.model';
import { Leave } from '../../core/models/leave.model';
import { SalaryService } from '../../core/services/salary.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { LeaveService } from '../../core/services/leave.service';
import { EmployeeService } from '../../core/services/employee.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { PositionService } from '../../core/services/position.service';
import { Position } from '../../core/models/position.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  employee?: Employee;
  department?: any;
  position?: Position;
  latestSalary?: Salary;
  todayAttendance?: Attendance;
  pendingLeaves: Leave[] = [];

  constructor(
    private employeeService: EmployeeService,
    private salaryService: SalaryService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private authService: AuthService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    const username = this.authService.getUser().username;

    if (username) {
      this.employeeService.getEmployeeByUsername(username).subscribe({
        next: (emp) => (this.employee = emp),
        error: (err) => console.error('Lỗi khi lấy thông tin nhân viên: ', err)
      });
    } else {
      console.warn('Chưa đăng nhập');
    }
  }

  loadOtherInfo(empId: number): void {
    this.salaryService.getLatestSalary(empId).subscribe(sal => this.latestSalary = sal);
    this.attendanceService.getTodayAttendance(empId).subscribe(att => this.todayAttendance = att);
    this.leaveService.getPendingLeaves(empId).subscribe(leaves => this.pendingLeaves = leaves);
  }
  get fullName(): string {
    const first = this.employee?.firstName ?? '';
    const last = this.employee?.lastName ?? '';
    return `${first} ${last}`.trim();
  }

  getPositionName(): string {
    const positionId = this.employee?.positionId;
    if(positionId) {
      this.positionService.getPositionFromId(positionId).subscribe({
        next: (pos) => (this.position = pos),
        error: (err) => console.error('Lỗi khi lấy thông tin chức vụ: ', err)
      });
      return this.position?.positionName ?? '';
    } else {
      return 'Chưa xác định';
    }
  }
}
