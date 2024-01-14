import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddUserComponent } from './add-user/add-user.component'; 
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ListUserComponent } from './list-user/list-user.component';
 
const routes: Routes = [
 { path: '', redirectTo: 'users', pathMatch: 'full' },
 { path: 'users', component: ListUserComponent },
 { path: 'employees', component: EmployeesListComponent },
 { path: 'employees/new', component: AddEmployeeComponent }, 
 { path: 'users/new', component: AddUserComponent }, 
 { path: 'employees/edit/:id', component: EditEmployeeComponent }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }