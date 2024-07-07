import { baseEnvironment, devEnvironment} from "./environment.base";

export const environment = {
  ...baseEnvironment,
  ...devEnvironment,

  target: 'web-ext-prod',
  production: false,
};
