export interface IDiscordOptions {
  url: string;
}

export interface IDiscordMessage {
  title: string;
  fieldName?: string;
  fieldValue?: string;
  inline?: boolean;
}
