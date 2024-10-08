import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
});

function setJsonWebToken(jsonWebToken) {
    axios.defaults.headers.common["x-auth-token"] = jsonWebToken;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setJsonWebToken,
};
