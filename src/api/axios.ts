import React, { useEffect } from 'react';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { envVar } from '../config/envVar';
import { errDefualtMsg, getServerErrorMsg } from '../util/constant/ErrorMessages';

export const axiosInstance = axios.create({
    baseURL: envVar.BASE_API_URL,
    headers: { 'Content-Type': 'application/json' }
});


axiosInstance.interceptors.request.use(
    (request: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
        // here each private request can be modified before each call.
        // example request.headers
        return request;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);


interface AxiosElement {
    children: JSX.Element;
    [otherProps: string]: unknown;
}

const AxiosInterceptor = ({ children }: AxiosElement) => {
    useEffect(() => {
        const resInterceptor = (response: AxiosResponse) => {
            return response;
        };

        let errMsg = '';
        const errInterceptor = (error: AxiosError) => {
            switch (error.response && error.response.status) {
                case 500:
                case 504:
                case 505:
                case 507:
                case 508:
                    errMsg = errDefualtMsg;

                    break;
                default:
                    errMsg = getServerErrorMsg(error)
                    break;
            }
            //this would be an Error modal in proper case...
            console.log(errMsg)
            return Promise.reject(error);
        };

        const interceptor = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);

        return () => axiosInstance.interceptors.response.eject(interceptor);
    }, []);
    return children;
};

export { AxiosInterceptor };

