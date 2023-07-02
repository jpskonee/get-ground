export interface APIStateProps {
    isLoading: boolean;
    error: string;
    message: string;
}

export const APIStatePropsDefault: APIStateProps = {
    isLoading: false,
    error: '',
    message: '',
}

export interface APISuccessResponse {
    data: any;
    message?: string;

}
export interface APIErrorResponse {
    error: string;
    code?: number
}