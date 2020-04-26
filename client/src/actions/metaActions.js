import { APP_BOOT } from '../constants/actionTypes';

export const boot = (site) => ({
  type: APP_BOOT,
  site,
});
