// src/msalConfig.ts
import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "0f19413e-c151-4c8f-899d-2427537565e0",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000",
  },
};

export const outlookRequest = {
  scopes: ["User.Read", "Mail.Read"],
};

export const msalInstance = new PublicClientApplication(msalConfig);
