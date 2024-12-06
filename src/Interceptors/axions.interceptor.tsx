import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { SnackbarUtilities } from '../Utilities/snackbar-manager';
import { getValidationErrors } from '../Utilities/get-validation-error';

export const AxiosInterceptor = () => {

    const updateHeader = (request: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');

        const skipInterceptor = request.params?.skipInterceptor;

        if (skipInterceptor === true) {
            delete request.params?.skipInterceptor;
        }

        if (skipInterceptor !== true) {
            request.headers = new AxiosHeaders({
                Authorization: token || '',
                "Content-Type": "application/json",
            });
        } else {
            request.headers = new AxiosHeaders({
                "Content-Type": request.headers['Content-Type'] || 'application/json',
            });
        }
    
        return request;
    };
    
    axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
        return updateHeader(request);
    });
    

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.data && error.response.data.message) {
                 // Mostrar mensaje de error del backend
                SnackbarUtilities.error(error.response.data.message); 
            } else {
                 // Mostrar mensaje genérico si no hay mensaje de error del backend
                SnackbarUtilities.error(getValidationErrors(error.code)); 
            }
            return Promise.reject(error);   
        });
};