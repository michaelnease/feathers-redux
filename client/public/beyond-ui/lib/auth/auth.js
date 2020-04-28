/*
 * TODO: add more error codes.
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
 */

import $window from "../window/window";
import { BadArgument, isObject } from "../value/value";

const newAuthContext = config => {
  if (!config || !isObject(config)) {
    throw new BadArgument("authConfig object is required.");
  }
  return new $window.AuthenticationContext(config);
};

function runWithAdal(authContext, app, doNotLogin = true) {
  // it must run in iframe too for refreshToken (parsing hash and get token)
  authContext.handleWindowCallback();

  // prevent iframe double app !!!
  if ($window === $window.parent) {
    if (!authContext.isCallback($window.location.hash)) {
      if (
        !authContext.getCachedToken(authContext.config.clientId) ||
        !authContext.getCachedUser()
      ) {
        if (doNotLogin) {
          app();
        } else {
          authContext.login();
        }
      } else {
        app();
      }
    }
  }
}

const redirectMessages = [
  "AADSTS16002", // old sid - https://github.com/salvoravida/react-adal/issues/46
  "AADSTS50076", // MFA support - https://github.com/salvoravida/react-adal/pull/45
  "AADSTS50079", // MFA support
];

function shouldAcquireNewToken(message) {
  return redirectMessages.reduce((a, v) => a || message.includes(v), false);
}

function adalGetToken(authContext, resourceGuiId, callback) {
  return new Promise((resolve, reject) => {
    authContext.acquireToken(resourceGuiId, (message, token, msg) => {
      if (!msg) {
        resolve(token);
      } else if (shouldAcquireNewToken(message)) {
        // Default to redirect for multi-factor authentication
        // but allow using popup if a callback is provided
        if (callback) {
          authContext.acquireTokenPopup(resourceGuiId, callback);
        } else {
          authContext.acquireTokenRedirect(resourceGuiId);
        }
      } else reject({ message, msg }); // eslint-disable-line
    });
  });
}

export { newAuthContext, runWithAdal, adalGetToken };
