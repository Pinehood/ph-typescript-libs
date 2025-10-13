import { Webhook } from "discord-webhook-node";
import { IService } from "../utils";
import { IDiscordMessage, IDiscordOptions } from "./interfaces";
import { TDiscordMessageLevel, TDiscordSetWhat } from "./types";

export class DiscordService implements IService<IDiscordOptions, Webhook> {
  private readonly options: IDiscordOptions;
  private readonly client: Webhook;

  constructor(options: IDiscordOptions) {
    this.options = options;
    this.client = new Webhook(this.options.url);
  }

  get config(): IDiscordOptions {
    return this.options;
  }

  get instance(): Webhook {
    return this.client;
  }

  set(what: TDiscordSetWhat, value: string): void {
    if (what === "avatar") {
      return this.client.setAvatar(value);
    } else if (what === "username") {
      return this.client.setUsername(value);
    }
  }

  send(
    level: TDiscordMessageLevel,
    { title, fieldName, fieldValue, inline }: IDiscordMessage,
  ): Promise<void> {
    if (level === "file") {
      return this.client.sendFile(title);
    }
    return this.client[level](
      title,
      fieldName || "unknown",
      fieldValue?.substring(0, 1024),
      inline,
    );
  }
}
