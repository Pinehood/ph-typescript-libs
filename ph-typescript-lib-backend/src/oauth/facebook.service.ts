import { Axios } from "axios";
import { IService } from "../utils";
import { EOAuthUrls, EOAuthUrlTokens } from "./constants";
import { IFacebookUser, IOAuthOptions, IOAuthService } from "./interfaces";

export class FacebookOAuthService
  implements IOAuthService<IFacebookUser>, IService<IOAuthOptions, Axios>
{
  private readonly options: IOAuthOptions;
  private readonly client: Axios;

  constructor(options: IOAuthOptions) {
    this.options = options;
    this.client = new Axios({});
  }

  get config(): IOAuthOptions {
    return this.options;
  }

  get instance(): Axios {
    return this.client;
  }

  async login(token: string) {
    const appUrl = EOAuthUrls.FACEBOOK_GET_TOKEN_APP.replace(
      EOAuthUrlTokens.ACCESS_TOKEN,
      token,
    );
    const verifyUrl = EOAuthUrls.FACEBOOK_VERIFY_TOKEN.replace(
      EOAuthUrlTokens.ACCESS_TOKEN,
      token,
    )
      .replace(EOAuthUrlTokens.CLIENT_ID, this.options.id)
      .replace(EOAuthUrlTokens.CLIENT_SECRET, this.options.secret);

    const appResponse = await this.client.get(appUrl);
    if (appResponse.status === 200 && appResponse.data) {
      const { id: appId } = appResponse.data;
      if (this.options.id !== appId) {
        return null;
      }
    } else {
      return null;
    }

    const verifyResponse = await this.client.get(verifyUrl);
    if (verifyResponse.status === 200 && verifyResponse.data) {
      const { id, email, name } = verifyResponse.data;
      let firstName = "";
      let lastName = "";
      if (name) {
        if (name.includes(" ")) {
          const split = name.split(" ");
          firstName = split[0];
          lastName = split[1];
        } else {
          firstName = name.toString();
        }
      }
      return {
        facebookId: id,
        email,
        firstName,
        lastName,
        accessToken: token,
      };
    }
    return null;
  }
}
