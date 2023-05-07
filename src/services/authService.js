import http from "./httpService";
import jwtDecode from "jwt-decode";

const jsonWebTokenKey = "token";
const apiEndpoint = "/auth";

http.setJsonWebToken(getJsonWebToken());

export async function login(email, password) {
    const { data: jsonWebToken } = await http.post(`${apiEndpoint}`, {
        email,
        password,
    });
    localStorage.setItem(jsonWebTokenKey, jsonWebToken);
}

export function logout() {
    localStorage.removeItem(jsonWebTokenKey);
}

export function getJsonWebToken() {
    return localStorage.getItem(jsonWebTokenKey);
}

export function loginWithJsonWebToken(jsonWebToken) {
    localStorage.setItem(jsonWebTokenKey, jsonWebToken);
}

export function getCurrentUser() {
    try {
        const jsonWebToken = localStorage.getItem(jsonWebTokenKey);
        return jwtDecode(jsonWebToken);
    } catch (error) {
        return null;
    }
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJsonWebToken,
    getJsonWebToken,
};
