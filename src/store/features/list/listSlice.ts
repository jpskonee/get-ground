import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import { ListNamesEnum, ListStateProps } from './listTypes';
import { APIStatePropsDefault } from "../../generalType";

export const initialState: ListStateProps = {
    books: { ...APIStatePropsDefault, data: [], count: 0 }
}

export const listSlice = createSlice({
    name: "list",
    initialState: initialState,
    reducers: {
        getListRequest: (state: ListStateProps, action: PayloadAction<ListNamesEnum>) => {
            const listName = action.payload
            return { ...state, [listName]: { ...state[listName], isLoading: true, error: '', message: '' } }
        },
        getListSuccess: (state: ListStateProps, action: PayloadAction<{ listName: ListNamesEnum, data: any }>) => {
            const { data, listName } = action.payload;
            return { ...state, [listName]: { ...state[listName], ...data, isLoading: false, error: '' } };
        },
        getListFailure: (state: ListStateProps, action: PayloadAction<{ listName: ListNamesEnum, error: string }>) => {
            const { listName, error } = action.payload;
            return { ...state, [listName]: { ...state[listName], error, isLoading: false, data: [] } };
        },
        clearListState: (state: ListStateProps, action: PayloadAction<ListNamesEnum>) => {
            const listName = action.payload;
            return { ...state, [listName]: { isLoading: false, error: '', message: '', data: [], count: 0 } };
        },
    },
});

export const selectListState = (state: AppState) => state.list;
export const { clearListState, getListFailure, getListRequest, getListSuccess } = listSlice.actions;
export default listSlice.reducer;