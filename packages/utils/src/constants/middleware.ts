const APP_HOSTNAME = process.env.NEXT_PUBLIC_APP_DOMAIN || "app.dub.co";
const SHORT_HOSTNAME = process.env.NEXT_PUBLIC_APP_SHORT_DOMAIN || "dub.sh";

const APP_ORIGIN = `https://${APP_HOSTNAME}`;
const HOME_ORIGIN = `https://${SHORT_HOSTNAME}`;

export const DEFAULT_REDIRECTS = {
  home: HOME_ORIGIN,
  dub: HOME_ORIGIN,
  signin: `${APP_ORIGIN}/login`,
  login: `${APP_ORIGIN}/login`,
  register: `${APP_ORIGIN}/register`,
  signup: `${APP_ORIGIN}/register`,
  app: APP_ORIGIN,
  dashboard: APP_ORIGIN,
  links: `${APP_ORIGIN}/links`,
  settings: `${APP_ORIGIN}/settings`,
  welcome: `${APP_ORIGIN}/onboarding/welcome`,
  discord: "https://twitter.com/dubdotco", // placeholder for now
};

export const DUB_HEADERS = {
  "x-powered-by": "Dub - The Modern Link Attribution Platform",
};

export const REDIRECTION_QUERY_PARAM = "redir_url";
