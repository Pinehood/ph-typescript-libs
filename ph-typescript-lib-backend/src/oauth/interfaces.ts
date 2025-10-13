export interface IOAuthService<T extends IOAuthUser> {
  login(token: string): Promise<T>;
}

export interface IOAuthOptions {
  id: string;
  secret: string;
}

export interface IOAuthUser {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  accessToken: string;
  refreshToken?: string | null;
}

export interface IGoogleUser extends IOAuthUser {
  googleId: string;
}

export interface IFacebookUser extends IOAuthUser {
  facebookId: string;
}

export interface IInstagramUser extends IOAuthUser {
  instagramId: string;
}
