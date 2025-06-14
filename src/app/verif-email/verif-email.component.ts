import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verif-email.component.html',
  styleUrl: './verif-email.component.css',
})
export class VerifEmailComponent implements OnInit {

  code: string = '';
  user: User = new User();
  err = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Login successful');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            const jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
      error: (err: any) => {
        if ((err.error.errorCode = 'INVALID_TOKEN')) {
          this.err = 'Token non valid';
        }
        if ((err.error.errorCode = 'EXPIRED_TOKEN')) {
          this.err = 'Token expiré';
        }
        console.log('Error:', err.error);
      },
    });
  }
}
