import axios from "axios";
import { API_URL } from "../Config/config"

export const associateDocument = async (opportunityId: string, name: string, type: string) => {
    const response = await axios.post(`${API_URL}documents/opportunities/${opportunityId}/upload-url`,
        {
            "fileName": name,
            "fileType": type,
        }
    );
    return response.data;
}

export const notifyBack = async (opportunityId: string, name: string, type: string) => {
    const response = await axios.post(`${API_URL}opportunities/${opportunityId}/documents`,
        {
            "fileName": name,
            "fileType": type,
        }
    );
    return response.data;
}

export const getDocuments = async (opportunityId: string) => {
    const response = await axios.get(`${API_URL}opportunities/${opportunityId}/documents`);
    return response.data;
}

export const downloadDocument = async (opportunityId: string, fileName: string) => {
    const response = await axios.post(`${API_URL}documents/opportunities/${opportunityId}/download-url`, {
        "fileName": fileName,
    });
    return response.data;
}

export const checkExistingDocument = async (opportunityId: string, fileName: string, fileType: string) => {
    const response = await axios.get(`${API_URL}documents/opportunities/${opportunityId}/check-existing-file`, {
        params: {
            fileName: fileName,
            fileType: fileType
        }
    });
    return response.data;
}

export const getDeleteLink = async (opportunityId: string, fileName: string) => {
    const response = await axios.post(`${API_URL}documents/opportunities/${opportunityId}/delete-url`,
        {
            "fileName": fileName,
        }
    );
    return response.data;
}

export const notyfyDeleteDocument = async (opportunityId: string, fileName: string) => {
    console.log('fileName', fileName);
    const response = await axios.delete(`${API_URL}opportunities/${opportunityId}/documents`, {
        data: {
            "fileName": fileName
        }
    });
    return response.data;
}
