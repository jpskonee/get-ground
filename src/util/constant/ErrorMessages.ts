export const errDefualtMsg = 'Server Error: Something went wrong!';

export const getServerErrorMsg = (error: any) => {
    return error?.response?.statusText || error?.message || errDefualtMsg;
}