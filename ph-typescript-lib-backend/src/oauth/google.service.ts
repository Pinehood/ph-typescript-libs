import { google } from "googleapis";
import { TokenInfo, TokenPayload } from "google-auth-library";
import { IService } from "../utils";
import { IGoogleUser, IOAuthOptions, IOAuthService } from "./interfaces";
import { TGoogleMode } from "./types";

export class GoogleOAuthService
  implements
    IOAuthService<IGoogleUser>,
    IService<IOAuthOptions, GoogleOAuthService>
{
  private readonly options: IOAuthOptions;

  constructor(options: IOAuthOptions) {
    this.options = options;
  }

  get config(): IOAuthOptions {
    return this.options;
  }

  get instance(): GoogleOAuthService {
    return this;
  }

  async login(token: string, mode: TGoogleMode = "id") {
    const oauthClient = new google.auth.OAuth2(
      this.options.id,
      this.options.secret,
    );
    if (!oauthClient) {
      return null;
    }

    let tokenInfo: TokenInfo | TokenPayload = null;
    if (mode === "id") {
      const idToken = await oauthClient.verifyIdToken({ idToken: token });
      if (!idToken) {
        return null;
      }
      tokenInfo = idToken.getPayload();
    } else if (mode === "access") {
      tokenInfo = await oauthClient.getTokenInfo(token);
    } else {
      return null;
    }
    if (!tokenInfo) {
      return null;
    }
    return {
      googleId: tokenInfo.sub,
      email: tokenInfo.email,
      accessToken: token,
    };
  }
}
