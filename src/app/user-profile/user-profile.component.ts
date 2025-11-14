import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from '../model/user.model';
import Keycloak from 'keycloak-js';

@Component({
    selector: 'app-user-profile',
    imports: [],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: UserProfile | undefined;

  constructor(private readonly keycloak: Keycloak) {}

  async ngOnInit() {
    if (this.keycloak?.authenticated) {
      const profile = await this.keycloak.loadUserProfile();
      this.user = {
        name: `${profile?.firstName} ${profile.lastName}`!,
        email: profile?.email!,
        username: profile?.username!,
      };
    }
  }
}
