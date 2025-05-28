import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendance } from '../models/attendance.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private apiUrl = 'https://localhost:5001/api/Attendances';

  constructor(private http: HttpClient) {}

  getTodayAttendance(empId: number): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.apiUrl}/Today/${empId}`);
  }

  getAllAttendanceByEmployee(empId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/Employee/${empId}`);
  }
}
