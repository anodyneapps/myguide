// Change this class to be similar to employee-form.component.ts, but using user.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';
 
@Component({
 selector: 'app-user-form',
 template: `
   <form class="user-form" autocomplete="off" [formGroup]="userForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
       <label for="name">Name</label>
     </div>
 
     <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
       <div *ngIf="name.errors?.['required']">
         Name is required.
       </div>
       <div *ngIf="name.errors?.['minlength']">
         Name must be at least 3 characters long.
       </div>
     </div>

     <div class="form-floating mb-3">
      <input class="form-control" type="text" formControlName="displayName" placeholder="Display Name" required>
      <label for="position">Display Name</label>
     </div>
 
     <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="emailAddress" placeholder="Email Address" required>
       <label for="email-address">Email Address</label>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="userForm.invalid">Add</button>
   </form>
 `,
 styles: [
   `.user-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})
export class UserFormComponent implements OnInit {
 //@Input()
 //initialState: BehaviorSubject<User> = new BehaviorSubject({});

 @Input()
initialState: BehaviorSubject<User> = new BehaviorSubject<User>({ user_name: '', 
display_name: '', email_address: '', oauth_id: '', 
user_preference: {follow_food_events: false,follow_meetup_events: false, follow_music_events: false, location: ''},  });
 
 @Output()
 formValuesChanged = new EventEmitter<User>();
 
 @Output()
 formSubmitted = new EventEmitter<User>();
 
 userForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.userForm.get('name')!; }
 get displayName() { return this.userForm.get('display-name')!; }
 get emailAddress() { return this.userForm.get('email-address')!; }
 
 ngOnInit() {
   this.initialState.subscribe(user => {
     this.userForm = this.fb.group({
       name: [ user.user_name, [Validators.required] ],
       displayName: [ user.display_name, [ Validators.required, Validators.minLength(5) ] ],
       emailAddress: [ user.email_address, [Validators.required] ]
     });
   });
 
   this.userForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.userForm.value);
 }
}