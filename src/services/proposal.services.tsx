import { API_URL } from '../Config/config';
import axios from 'axios';

export const getProposal = async (proposalId: string) => {
    const response = await axios.get(`${API_URL}proposals/${proposalId}`);
    return response.data;
}

export const updateProposal = async (proposalId: string, techProposal: string, goalAndContext: string) => {
    const response = await axios.patch(`${API_URL}proposals/${proposalId}`,
        {
            "techProposal": techProposal,
            "goalAndContext": goalAndContext
        }
    );
    return response.data;
}

export const completeEstimation = async (estimationId: string) => {
    const response = await axios.put(`${API_URL}estimations/${estimationId}/complete`);
    return response.data;
}

export const setFinishDetailsProposal = async (proposalId: string, total: number, months: number) => {
    const response = await axios.patch(`${API_URL}proposals/${proposalId}/special-fields`,
        {
            "total": total,
            "estimatedMonths": months
        },
    );
    return response.data;
}

export const finishProposal = async (proposalId: string) => {
    const response = await axios.patch(`${API_URL}proposals/${proposalId}/finish`);
    return response.data;
}

export const getPDF = async (proposalId: string) => {
    const response = await axios.get(`${API_URL}proposals/${proposalId}/functional`,
        { responseType: 'blob' });
    return response.data;
}

export const deleteProposal = async (proposalId: string) => {
    const response = await axios.delete(`${API_URL}proposals/${proposalId}`);
    return response.data;
}
