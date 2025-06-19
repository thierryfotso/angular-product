import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from '../model/user.model';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user: UserProfile | undefined;

  constructor(private readonly keycloak: KeycloakService) {}

  async ngOnInit() {
    if (this.keycloak?.isLoggedIn()) {
      const profile = await this.keycloak.loadUserProfile();
      this.user = {
        name: `${profile?.firstName} ${profile.lastName}`!,
        email: profile?.email!,
        username: profile?.username!,
      };
    }
  }
}
