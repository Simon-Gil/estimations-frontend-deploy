import axios from "axios";
import { API_URL } from "../Config/config"
import { validateEmail, validatePassword, validatePasswordsMatch } from "../Utilities/validators";
import { saveToken } from "../Helpers/tokenHelpers";

export const loginUser = async (email: string, password: string) => {
    validateEmail(email);
    const response = await axios.post(`${API_URL}auth/login`, { email, password });
    const token = response.data.token;
    saveToken(token);
    return response.data;
};

export const recoverUserData = async () => {
    const response = await axios.get(`${API_URL}users/me`);
    return response.data;
}

export const resetPasswordServ = async (token: string, password: string, confirmPassword: string) => {
    validatePassword(password);
    validatePasswordsMatch(password, confirmPassword);
    const response = await axios.post(`${API_URL}reset-password`, {
        token: token,
        password: password,
    });

    return response.data;
};

export const resetPasswordRequest = async (email: string) => {
    validateEmail(email);
    console.log("el email llega al servicio: ", email);
    const response = await axios.post(`${API_URL}reset-password/request`,
        {
            "email": email
        }
    );
    return response.data;
};