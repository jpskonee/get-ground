import { errDefualtMsg } from "../constant/ErrorMessages"

export const apiErrorHandler = (error: any) => {
    return error?.response?.data?.message || error.message || errDefualtMsg
}