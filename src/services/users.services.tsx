import axios from 'axios';
import { API_URL } from '../Config/config'
import { validateEmail, validateField } from '../Utilities/validators';
import { CreateUserData, UpdateUserData } from '../models/user.model';


export const registerUser = async (user: CreateUserData) => {

    validateField(user.name);
    validateField(user.lastname);
    validateEmail(user.email);

    const response = await axios.post(`${API_URL}users`, {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        department: user.department,
        grade: user.grade,
    });
    return response.data.user;
};

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}users`);
    return response.data;
}


export const getFilteredUsers = async (departmentId: string) => {
    const response = await axios.get(`${API_URL}users/filtered?departments=${departmentId}`);
    return response.data;
}

export const getDepartments = async () => {
    const response = await axios.get(`${API_URL}departments`);
    return response.data;
}

export const getGrades = async () => {
    const response = await axios.get(`${API_URL}grades`);
    return response.data;
}

export const updateUser = async (data: UpdateUserData) => {
    validateField(data.name);
    validateField(data.lastname);
    validateEmail(data.email);
    validateField(data.department.id);
    validateField(data.grade.id);


    const response = await axios.put(`${API_URL}users/${data.id}`, {
        name: data.name,
        lastname: data.lastname,
        department: data.department.id,
        grade: data.grade.id,
        email: data.email,
        roles: data.roles
    });
    return response.data.user;
};

export const blockUnblock = async (userId: string, changeBlock: boolean) => {
    const response = await axios.put(`${API_URL}users/${userId}/block`,
    {
        "block": changeBlock
    })
    return response.data;
}

