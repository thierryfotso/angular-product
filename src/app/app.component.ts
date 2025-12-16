import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoaderComponent } from "./loader/loader.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterLink, RouterOutlet, TranslateModule, LoaderComponent]
})
export class AppComponent implements OnInit {
  title = 'angular-product';

  constructor(
    public authService: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isExpired()) {
      this.router.navigate(['/login']);
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
