import axios from 'axios';
import { API_URL } from '../Config/config';
import { validateEmail } from '../Utilities/validators';
import { Account } from '../models/account.model';

export const newAccount = async (name: string, email: string, commercialManager?: string, technicalManager?: string) => {
    validateEmail(email);
    const response = await axios.post(`${API_URL}accounts`, {
        name: name,
        email: email,
        commercialManager: commercialManager,
        technicalManager: technicalManager,
        });
    return response.data;
};

export const getAccounts = async () => {
    const response = await axios.get(`${API_URL}accounts`);
    return response.data;
};

export const updateAccount = async (account: Account , isDefault: boolean) => {
    console.log('Account en service:', account);
    const response = await axios.put(`${API_URL}accounts/${account.id}`, {
        name: account.name,
        email: account.email,
        isDefault: isDefault,
        commercialManager: account.commercialManager?.id,
        technicalManager: account.technicalManager?.id,
    });
    console.log('Response:', response);
    return response.data;
};

export const getAccount = async (proposalId: string) => {
    const response = await axios.get(`${API_URL}proposals/${proposalId}/account`);
    return response.data;
}