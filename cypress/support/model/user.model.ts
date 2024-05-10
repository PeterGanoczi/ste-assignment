export interface UserCreds {
  username: string;
  email: string;
  password: string;
}

export interface UserProfileResponse {
  profile: Profile;
}

export interface Profile {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
}

export interface User {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  image: string;
  token: string;
}

export interface UserResponse {
  user: User;
}
