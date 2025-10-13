export const EOAuthUrls = {
  FACEBOOK_GET_TOKEN_APP:
    "https://graph.facebook.com/app?fields=id,name&access_token={token}",
  FACEBOOK_VERIFY_TOKEN:
    "https://graph.facebook.com/me?fields=id,name,email&client_id={id}&client_secret={secret}&access_token={token}",
  INSTAGRAM_VERIFY_TOKEN:
    "https://graph.instagram.com/me?fields=username&client_id={id}&client_secret={secret}&access_token={token}",
} as const;

export const EOAuthUrlTokens = {
  ACCESS_TOKEN: "{token}",
  CLIENT_ID: "{id}",
  CLIENT_SECRET: "{secret}",
  RESPONSE: "{response}",
} as const;
