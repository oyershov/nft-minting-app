import { createContext } from 'react';
import { PublicClientApplication } from '@azure/msal-browser'

export class MSAuthenticationProvider {
  myMSALObj
  scopes = ['User.ReadBasic.All', 'openid', 'profile']

  constructor() {
    //
    // Depending on what you as a developer want to achieve, please use different ways to run the frontend.
    // These calls set the env variables VUE_APP_REDIRECTDOMAIN, VUE_APP_CLIENT_ID, and VUE_APP_TENANT_ID in the correct way for you.
    // The following scenarios may apply:
    //  (1) During development on localhost you want to use your own, private account (like helga.maier@my-email-provider.com).
    //       => Simply call 'yarn serve'.
    //  (2) During development on localhost you want to use your Accenture dev account (like helga.maier@ds.dev.accenture.com).
    //       => Simply call 'yarn serve-acc'.
    //  (3) You want to run your frontend code in an AWS prep environment. Here you need to use your
    //      Accenture dev account (like helga.maier@ds.dev.accenture.com).
    //       => Simply commit your changes and open a browser with 'https://prep-my-env.s2gether.xyz' where 'prep-my-env' is
    //          the name of your branch.
    // See also https://wiki.sinnerschrader.com/x/KwFjJg
    //
    const redirectDomain = process.env.VUE_APP_REDIRECTDOMAIN
    const redirectUrl = redirectDomain ? 'https://' + redirectDomain : 'http://localhost:8080'

    const clientId = process.env.VUE_APP_CLIENT_ID // also called 'Application ID'
      ? process.env.VUE_APP_CLIENT_ID
      : 'a5864915-4eab-4460-9b26-7009f63c6e04' // use the client ID for a private user login
    const tenantId = process.env.VUE_APP_TENANT_ID ? process.env.VUE_APP_TENANT_ID : 'common'
    const authority = 'https://login.microsoftonline.com/' + tenantId

    const msalConfig = {
      auth: {
        clientId: clientId,
        authority: authority,
        redirectUri: redirectUrl
      },
      cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
      }
    }

    this.myMSALObj = new PublicClientApplication(msalConfig)
  }

  acquireAccessTokenSilent = async (homeAccountId) => {
    const account = this.myMSALObj.getAccountByHomeId(homeAccountId)
    if (account === null) {
      console.error('Unable to login silently, the saved home account can not be accessed')
      return undefined
    }

    const loginRequest = {
      scopes: this.scopes,
      account: account
    }

    const response = await this.myMSALObj.acquireTokenSilent(loginRequest)
    if (!response.account) {
      throw new Error('Did not receive account information after acquiring token')
    }

    return {
      accessToken: response.accessToken,
      account: response.account,
      expiresOn: response.expiresOn
    }
  }

  acquireAccessToken = async () => {
    const loginRequest = {
      scopes: this.scopes,
      prompt: 'select_account'
    }

    const response = await this.myMSALObj.loginPopup(loginRequest)
    if (!response.account) {
      throw new Error('Did not receive account information after acquiring token')
    }

    return {
      accessToken: response.accessToken,
      account: response.account,
      expiresOn: response.expiresOn
    }
  }
}

export const MSAuthenticationProviderSymbol = Symbol('MSAuthenticationProviderSymbol')
export const MSAuthentication = createContext({authProvider: undefined});