import axios from 'axios';
import { API_URL } from '../Config/config';

export const getRoles = async () => {
    const response = await axios.get(`${API_URL}roles`);
    return response.data; 
};
  
export const getPermissionsTree = async () => {
    const response = await axios.get(`${API_URL}permissions`);
    return response.data; 
};
  
export const getRolePermissions = async (roleId: string) => {
    const response = await axios.get(`${API_URL}roles/${roleId}/permissions`);
    return response.data; 
};
  
export const updateRolePermissions = async (roleId: string, granted: string[], revoked: string[]) => {
    console.log('revoked', revoked);
    console.log('granted', granted);
    const response = await axios.put(`${API_URL}roles/${roleId}/permissions`, {
      revoked,
      granted
  });
  return response.data;  
};