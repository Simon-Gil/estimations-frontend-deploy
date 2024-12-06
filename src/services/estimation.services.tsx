import { API_URL } from '../Config/config';
import axios from 'axios';
import { UpdateHrsProfile } from '../models/estimation.model';

export const createEstimation = async (users: string[], proposalId: string) => {
    const response = await axios.post(`${API_URL}proposals/${proposalId}/estimations`,
        {
            "users": users
        },
    );
    return response.data;
}

export const createNewTask = async (description: string, estimationId: string, slcId: string, profiles: string[]) => {
    const response = await axios.post(`${API_URL}estimations/${estimationId}/tasks`,
        {
            "description": description,
            "secondLevelCategory": slcId,
            "profiles": profiles
        }
    );
    return response.data;
}

export const getEstimations = async () => {
    const response = await axios.get(`${API_URL}estimations`);
    return response.data;
}

export const getProposals = async () => {
    const response = await axios.get(`${API_URL}proposals`);
    return response.data;
}

export const getProfiles = async () => {
    const response = await axios.get(`${API_URL}profiles`);
    return response.data;
}

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}task-categories`);
    return response.data;
}

export const getDetail = async (estimationId: string) => {
    const response = await axios.get(`${API_URL}estimations/${estimationId}/detail`);
    return response.data;
}

export const addUser = async (data: any, estimationId: string) => {
    const response = await axios.post(`${API_URL}estimations/${estimationId}/users`, data);
    return response.data;
}

export const updatehrsTaskProfiles = async (data: any, profileId: string, taskId: string) => {
    const response = await axios.put(`${API_URL}hrs-task-profile/${taskId}/${profileId}`, data);
    return response.data;
}

export const upadateHrsProfile = async (taskId: string, profileId: string, Hrs: UpdateHrsProfile) => {
    const response = await axios.put(`${API_URL}hrs-task-profile/${taskId}/${profileId}`, Hrs);
    return response.data;
}

export const getExcel = async (estimationId: string) => {
    const response = await axios.get(`${API_URL}excel/estimations/${estimationId}/download`, {
        headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        responseType: 'blob'
    });
    return response;
};

export const updateTotal = async (estimationId: string, total: number) => {
    const response = await axios.patch(`${API_URL}estimations/${estimationId}/total`,
        {
            "total": total
        });
    return response.data;
}

export const updateEstimationDone = async (estimationId: string) => {
    const response = await axios.put(`${API_URL}estimations/${estimationId}/complete`);
    return response.data;
}

export const addProfile = async (taskId: string, profileId: string) => {
    const response = await axios.post(`${API_URL}tasks/${taskId}/profile-estimation`,
        {
            "profile": profileId
        }
    );
    return response.data;
}

export const patchTaskStatus = async (taskId: string, status: string) => {
    const response = await axios.patch(`${API_URL}tasks/${taskId}/status`,
        {
            "status": status
        }
    );
    return response.data;
}

export const notifyUserEstimation = async (estimationId: string) => {
    const response = await axios.patch(`${API_URL}estimation-users/finish/${estimationId}`);
    return response.data;
}

export const getTaskDetail = async (taskId: string) => {
    const response = await axios.get(`${API_URL}tasks/${taskId}`);
    return response.data;
}

export const deleteTaskByProfile = async (taskId: string, profileId: string) => {
    const response = await axios.delete(`${API_URL}hrs-task-profile/${taskId}/${profileId}`);
    return response.data;
}

export const deleteTaskByID = async (taskId: string) => {
    const response = await axios.delete(`${API_URL}tasks/${taskId}`);
    return response.data;
}

export const deleteUserOnEstimation = async (estimationId: string, userId: string) => {
    const response = await axios.delete(`${API_URL}estimations/${estimationId}/users/${userId}`);
    return response.data;
}


