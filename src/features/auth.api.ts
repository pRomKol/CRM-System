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
    console.log(response.data)
    await getUserProfile()
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
         const response = await axios.post(`${baseURL}/auth/refresh`, {refreshToken})
         localStorage.setItem('refreshToken', response.data.refreshToken)
         localStorage.setItem('accessToken', response.data.accessToken)
    }
     catch (e){}
 }

export async function getUserProfile(): Promise<any> {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.get(`${baseURL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            const newAccessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`${baseURL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${newAccessToken}`
                }
            });
            return response.data;
        }
        throw error;
    }
}
 export async function updateUserProfile(upData) {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.put(`${baseURL}/user/profile`, upData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
    return response.data
}
export async function forgotPass(pass){
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.put(`${baseURL}/user/profile/reset-password`, {
        pass
    })
}
