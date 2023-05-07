import http from "./httpService";

const apiEndpoint = "/users";

function userUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getUsers() {
    return http.get(apiEndpoint);
}

export function getUser(id) {
    return http.get(userUrl(id));
}

export function registerUser(user) {
    return http.post(`${apiEndpoint}`, {
        email: user.username,
        password: user.password,
        name: user.name,
    });
}

export async function deleteUser(id) {
    return http.delete(userUrl(id));
}
