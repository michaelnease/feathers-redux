import { APP_BOOT } from '../constants/action.types';

export const boot = (site) => ({
  type: APP_BOOT,
  site,
});
