import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-frontend';
  userService = inject(UserService);

  constructor() {
    const user = this.userService.getUserFromStorage();
    if (!user) {
      const randNumber = Math.ceil(Math.random() * 9998 + 1);
      const randName = `user_${randNumber}`;
      this.userService.createUser(randName).subscribe((user) => {
        console.log('user created', user);
        this.userService.saveUserToStorage(user);
      });
    }
  }
}
