import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserPreferencesListComponent } from './user-preferences-list/user-preferences-list.component';
import { ListUserComponent } from './list-user/list-user.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeeFormComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    UserPreferencesListComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
