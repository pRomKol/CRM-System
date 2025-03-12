import axios from 'axios';
import {FieldType} from "../pages/login/LoginPage.tsx";


const baseURL = 'https://easydev.club/api/v1';

type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};


export async function signIn(authData: FieldType): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${baseURL}/auth/signin`, authData);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return response.data;

}

export async function signUp(authData: any): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${baseURL}/auth/signup`, authData);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return response.data;
}



 export async function refreshAccessToken(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken')
     try {
         const response = await axios.post(`${baseURL}/auth/refresh`, {refreshToken},)
         localStorage.setItem('refreshToken', response.data.refreshToken)
         localStorage.setItem('accessToken', response.data.accessToken)
    }
     catch (e){}
 }
