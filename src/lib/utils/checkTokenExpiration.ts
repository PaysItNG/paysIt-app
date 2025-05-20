export const isTokenExpiringSoon = (
  token: string | null,
  threshHoldSec: number = 10
) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTimeStamp = payload?.exp * 1000;
    const currentTimeStamp = Date.now();
    const remainingTimeStamp = expirationTimeStamp - currentTimeStamp;
    return remainingTimeStamp <= threshHoldSec * 1000;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return null;
  }
};
