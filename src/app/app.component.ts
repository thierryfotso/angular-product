import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [RouterLink, RouterOutlet]
})
export class AppComponent {
  title = 'angular-product';

  constructor(public authService:AuthService){
  }

  onLogout(){
    this.authService.logout();
  }
}
