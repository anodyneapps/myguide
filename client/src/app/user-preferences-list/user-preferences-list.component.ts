import { Component, OnInit } from '@angular/core'; 
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({ 
	selector: 'my-app', 
	templateUrl: './user-preferences-list.html', 
	styleUrls: ['./user-preferences-list.css'] 
}) 
// export class UserPreferencesListComponent { 
// 	title = 'AngularApp'; 
// 	typesOfCSS: string[] = ['CSS', 'SASS', 'SCSS', 
// 							'Bootstrap', 'Tailwind CSS']; 
// 	save() { 
// 		alert('Saved!'); 
// 	} 

// 	undo() { 
// 		alert('Undo done!'); 
// 	} 
// }


export class UserPreferencesListComponent implements OnInit {
	users$: Observable<User[]> = new Observable();
	
	constructor(private userService: UserService) { }
	
	ngOnInit(): void {
	  this.fetchUsers();
	}
	
	deleteUser(id: string): void {
	  this.userService.deleteUser(id).subscribe({
		next: () => this.fetchUsers()
	  });
	}
	
	private fetchUsers(): void {
	  this.users$ = this.userService.getUsers();
	}
}