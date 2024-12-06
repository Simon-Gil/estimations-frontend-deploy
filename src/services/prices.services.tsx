import axios from 'axios';
import { API_URL } from '../Config/config'
import { PriceConfigToSend } from '../models/prices.model';

export const getProfiles = async () => {
    const response = await axios.get(`${API_URL}profiles`);
    return response.data;
}

export const newPrice = async (priceConfig: PriceConfigToSend, accountId: string) => {
    const response = await axios.post(`${API_URL}accounts/${accountId}/price-config`, priceConfig);
    return response.data;
};

export const getPriceConfig = async (id: string) => {
    const response = await axios.get(`${API_URL}accounts/${id}/price-config`);
    return response.data;
}

export const updatePriceConfig = async (priceConfig: PriceConfigToSend, priceId: string) => {
    const response = await axios.put(`${API_URL}price-configs/${priceId}`, priceConfig);
    return response.data;
}

export const assignDefault = async (accountId: string) => {
    const response = await axios.put(`${API_URL}accounts/${accountId}/price-config/assign-default`);
    return response.data;
}
