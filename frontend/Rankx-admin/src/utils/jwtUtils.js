import jwtDecode from "jwt-decode";

export const getRoleFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);

    // If backend returns 'role' directly
    if (decoded.role) return decoded.role;

    // If backend uses 'authorities' array
    if (decoded.authorities && decoded.authorities.length > 0) {
      return decoded.authorities[0];
    }

    return null;
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
};
