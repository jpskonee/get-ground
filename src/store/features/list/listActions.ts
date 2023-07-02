import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetListPayload } from "./listTypes";
import { axiosInstance } from "../../../api/axios";
import { apiErrorHandler } from "../../../util/helper/ApiResponseHandler";
import { getListFailure, getListRequest, getListSuccess } from "./listSlice";

export const getListAction = createAsyncThunk('list/getAction', async ({ endpoint, payload, listName }: GetListPayload, { rejectWithValue, dispatch }) => {
    try {
        dispatch(getListRequest(listName))
        const { data } = await axiosInstance.post(`/${endpoint}`, JSON.stringify(payload));
        const newData = { message: `Get ${listName} List Successful`, data: data[listName], count: data?.count }
        dispatch(getListSuccess({ listName: listName, data: newData }))
        return { data: newData, listName };
    } catch (error) {
        const errMgs = apiErrorHandler(error)
        dispatch(getListFailure({ listName: listName, error: errMgs }))
        return rejectWithValue(errMgs);
    }
});