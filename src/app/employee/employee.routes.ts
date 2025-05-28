import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AttendanceComponent } from "./attendance/attendance.component";
// import { LeavesComponent } from "./leaves/leaves.component";

export const employeeRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'attendance', component: AttendanceComponent },
];
