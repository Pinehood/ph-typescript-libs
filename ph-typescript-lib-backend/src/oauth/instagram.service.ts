import { Axios } from "axios";
import { IService } from "../utils";
import { EOAuthUrls, EOAuthUrlTokens } from "./constants";
import { IInstagramUser, IOAuthOptions, IOAuthService } from "./interfaces";

export class InstagramOAuthService
  implements IOAuthService<IInstagramUser>, IService<IOAuthOptions, Axios>
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
    const url = EOAuthUrls.INSTAGRAM_VERIFY_TOKEN.replace(
      EOAuthUrlTokens.ACCESS_TOKEN,
      token,
    )
      .replace(EOAuthUrlTokens.CLIENT_ID, this.options.id)
      .replace(EOAuthUrlTokens.CLIENT_SECRET, this.options.secret);
    const response = await this.client.get(url);
    if (response.status === 200 && response.data) {
      const { id, username } = response.data;
      let firstName = "";
      let lastName = "";
      if (username.includes(" ")) {
        const split = username.split(" ");
        firstName = split[0];
        lastName = split[1];
      } else {
        firstName = username;
      }
      return {
        instagramId: id,
        email: username.trim().replace(/ /g, "") + "@instagram.com",
        firstName,
        lastName,
        accessToken: token,
      };
    }
    return null;
  }
}
