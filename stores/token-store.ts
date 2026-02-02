type CookieSameSite = "Strict" | "Lax" | "None";

interface CookieOptions {
  maxAge?: number;
  sameSite?: CookieSameSite;
  secure?: boolean;
  path?: string;
}

interface TokenPair {
  accessToken?: string | null;
  refreshToken?: string | null;
}

const ACCESS_TOKEN_KEY = "jvdad.access-token";
const REFRESH_TOKEN_KEY = "jvdad.refresh-token";
const ACCESS_TOKEN_TTL_SECONDS = 60 * 60; // 1 hour
const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 14; // 14 days

const memoryStore: Required<TokenPair> = {
  accessToken: null,
  refreshToken: null,
};

const isBrowser = typeof document !== "undefined";

function resolveSecureFlag(preferredSecure?: boolean) {
  if (!isBrowser) {
    return Boolean(preferredSecure);
  }

  if (typeof preferredSecure === "boolean") {
    return preferredSecure && window.location.protocol === "https:";
  }

  return window.location.protocol === "https:";
}

function setCookie(key: string, value: string, options: CookieOptions = {}) {
  if (!isBrowser) {
    return;
  }

  const resolvedOptions: Required<CookieOptions> = {
    maxAge: options.maxAge ?? ACCESS_TOKEN_TTL_SECONDS,
    sameSite: options.sameSite ?? "Strict",
    secure: resolveSecureFlag(options.secure),
    path: options.path ?? "/",
  };

  let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  cookie += `; Max-Age=${resolvedOptions.maxAge}`;
  cookie += `; Path=${resolvedOptions.path}`;
  cookie += `; SameSite=${resolvedOptions.sameSite}`;
  if (resolvedOptions.secure) {
    cookie += "; Secure";
  }

  document.cookie = cookie;
}

function deleteCookie(key: string) {
  if (!isBrowser) {
    return;
  }

  document.cookie = `${encodeURIComponent(key)}=; Max-Age=0; Path=/; SameSite=Strict`;
}

function readCookie(key: string): string | null {
  if (!isBrowser) {
    return null;
  }

  const cookies = document.cookie ? document.cookie.split("; ") : [];

  for (const chunk of cookies) {
    const [cookieKey, ...rest] = chunk.split("=");
    if (decodeURIComponent(cookieKey) === key) {
      return decodeURIComponent(rest.join("="));
    }
  }

  return null;
}

async function persistAccessToken(token: string | null | undefined) {
  memoryStore.accessToken = token ?? null;

  if (!isBrowser) {
    return;
  }

  if (token) {
    setCookie(ACCESS_TOKEN_KEY, token, {
      maxAge: ACCESS_TOKEN_TTL_SECONDS,
    });
  } else {
    deleteCookie(ACCESS_TOKEN_KEY);
  }
}

async function persistRefreshToken(token: string | null | undefined) {
  memoryStore.refreshToken = token ?? null;

  if (!isBrowser) {
    return;
  }

  if (token) {
    setCookie(REFRESH_TOKEN_KEY, token, {
      maxAge: REFRESH_TOKEN_TTL_SECONDS,
    });
  } else {
    deleteCookie(REFRESH_TOKEN_KEY);
  }
}

async function resolveAccessToken() {
  if (memoryStore.accessToken) {
    return memoryStore.accessToken;
  }

  const token = readCookie(ACCESS_TOKEN_KEY);
  memoryStore.accessToken = token ?? null;
  return token ?? null;
}

async function resolveRefreshToken() {
  if (memoryStore.refreshToken) {
    return memoryStore.refreshToken;
  }

  const token = readCookie(REFRESH_TOKEN_KEY);
  memoryStore.refreshToken = token ?? null;
  return token ?? null;
}

export const tokenStorage = {
  async setTokens({ accessToken, refreshToken }: TokenPair) {
    await Promise.all([
      persistAccessToken(accessToken),
      persistRefreshToken(refreshToken),
    ]);
  },

  async setAccessToken(accessToken: string | null) {
    await persistAccessToken(accessToken);
  },

  async setRefreshToken(refreshToken: string | null) {
    await persistRefreshToken(refreshToken);
  },

  async getAccessToken() {
    return resolveAccessToken();
  },

  async getRefreshToken() {
    return resolveRefreshToken();
  },

  async clearTokens() {
    await Promise.all([
      persistAccessToken(null),
      persistRefreshToken(null),
    ]);
  },
};

export type { TokenPair };
