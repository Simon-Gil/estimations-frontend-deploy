import axios from "axios";
import { API_URL } from "../Config/config"
import { DataCreateOpportunity } from "../models/opportunity.models";

export const getOpportunitiesAccount = async (accountId: string) => {
    const response = await axios.get(`${API_URL}accounts/${accountId}/opportunities`);
    return response.data; 
};

export const newOpportunity = async (opportunity: DataCreateOpportunity) => {
    const response = await axios.post(`${API_URL}accounts/${opportunity.accountId}/opportunities`, {
        name: opportunity.name,
        requirements: opportunity.requirements, 
        typology: opportunity.typology.id,
        commercialManager: opportunity.commercialManager || undefined,
        technicalManager: opportunity.technicalManager || undefined,
    });
    return response.data;  
};

export const getEstimationByOpportunity = async (opportunityId: string) => {
    const response = await axios.get(`${API_URL}opportunities/${opportunityId}/estimations`);
    return response.data;
}

export const getOpportunities = async () => {
    const response = await axios.get(`${API_URL}opportunities`);
    return response.data; 
};

export const changeStatus = async (opportunityId: string, status: string) => {
    const response = await axios.patch(`${API_URL}opportunities/${opportunityId}/status`, {
        status: status,
    });
    return response.data;
}

export const newProposal = async (opportunityId: string, techProposal: string, goalAndContext: string ) => {
    const response = await axios.post(`${API_URL}opportunities/${opportunityId}/proposals`, {
        techProposal: techProposal,
        goalAndContext: goalAndContext, 
    });
    return response.data;  
};

export const deleteOpportunity = async (opportunityId: string) => {
    const response = await axios.delete(`${API_URL}opportunities/${opportunityId}`);
    return response.data;
}