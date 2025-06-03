import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'angular-product';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    let isloggedin: string;
    let loggedUser: string;
    isloggedin = localStorage.getItem('isLoggedIn')!;
    loggedUser = localStorage.getItem('loggedUser')!;
    if (isloggedin != 'true' || !loggedUser) this.router.navigate(['/login']);
    else this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }

  onLogout() {
    this.authService.logout();
  }
}
