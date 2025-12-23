let accessToken: string | null = null;

export const setAccessToken = (t: string | null) => {
  accessToken = t && t.trim() ? t : null;
};

export const getAccessToken = () => accessToken;
