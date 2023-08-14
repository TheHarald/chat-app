import jwtDecode from "jwt-decode"; // A library to decode JWTs

export function isTokenValid(token: string): boolean {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    return decodedToken.exp * 1000 > Date.now(); // Convert exp to milliseconds
  } catch (error) {
    return false;
  }
}
