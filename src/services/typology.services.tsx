import axios from 'axios';
import { API_URL } from '../Config/config'

export const createTypology = async (name: string) => {
    const response = await axios.post(`${API_URL}typologies`, {
        name: name,
    });
    return response.data;  
}

export const getTypologies = async () => {
    const response = await axios.get(`${API_URL}typologies`);
    return response.data;
}