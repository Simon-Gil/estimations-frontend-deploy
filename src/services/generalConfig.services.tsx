import axios from 'axios';
import { API_URL } from '../Config/config'
import { PriceConfigToSend } from '../models/prices.model';
import { EmailConfig, SecurityConfig } from '../models/settings.model';

export const getSettings = async () => {
    const response = await axios.get(`${API_URL}settings`);
    return response.data;
}

export const getSettingsPrice = async () => {
    const response = await axios.get(`${API_URL}settings/default-price-config`);
    return response.data;
}

export const patchMailConfig = async (emailConfig: EmailConfig) => {
    const response = await axios.patch(`${API_URL}settings/email-config`, emailConfig);
    return response.data;
}

export const patchSecurityConfig = async (securityConfig: SecurityConfig) => {
    const response = await axios.patch(`${API_URL}settings/security-config`, securityConfig);
    return response.data;
}

export const patchProposalConfig = async (expirationProposalDays: number) => {
    console.log('expirationProposalDays', expirationProposalDays)
    const response = await axios.patch(`${API_URL}settings/proposal-expiration`,{
        "expirationProposalDays" : expirationProposalDays
    });
    return response.data;
}

export const patchDefaultPrice = async (priceConfig: PriceConfigToSend) => {
    const response = await axios.patch(`${API_URL}settings/default-price-config`, priceConfig);
    return response.data;
};