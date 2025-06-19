export class User {
  name!: string;
  username!: string;
  password!: string;
  email!: string;
  enabled!: boolean;
  roles!: string[];
}

export class UserProfile {
  name?: string;
  username?: string;
  email?: string;
}
